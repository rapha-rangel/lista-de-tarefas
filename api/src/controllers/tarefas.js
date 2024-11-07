import { db } from '../config/db.js';

export const getTarefas = (_, res)=>{
  const q= "SELECT * FROM tarefas";

  db.query(q, (err, data)=>{
    if(err) return res.json(err);
    return res.status(200).json(data)
  })
}

export const addTarefas = (req, res) => {
  const { name, cost, date, ordem } = req.body;
  const q =
    "INSERT INTO tarefas(`nome_tarefas`, `custo`, `data_limite`, `ordem`) VALUES(?)";

    const values = [name, cost, date, ordem];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(201).json("Tarefa criada com sucesso.");
  });
};


export const updateOrdemTarefas =(req, res)=>{
  const { id } = req.params;
  const { name, cost, date, ordem: newOrder } = req.body;

  const updateTaskQuery = `
    UPDATE tarefas 
    SET nome_tarefas = ?, custo = ?, data_limite = ?, ordem = ? 
    WHERE id = ?`;
  
  const values = [name, cost, date, newOrder, id];

  db.query(updateTaskQuery, values, (err) => {
    if (err) return res.json(err);
    
    const selectQuery = "SELECT * FROM tarefas ORDER BY `ordem`";
    db.query(selectQuery, (err, tasks) => {
      if (err) return res.status(500).json(err);

      const updatedTasks = tasks.map(task => ({ ...task }));
      const currentTaskIndex = updatedTasks.findIndex(task => task.id === parseInt(id));

      if (currentTaskIndex !== -1) {
        const [movedTask] = updatedTasks.splice(currentTaskIndex, 1); 
        updatedTasks.splice(newOrder - 1, 0, movedTask); 
      }

      const updateQueries = updatedTasks.map((task, index) => {
        if (task.ordem !== index + 1) {
          return new Promise((resolve, reject) => {
            const updateOrderQuery = "UPDATE tarefas SET `ordem` = ? WHERE id = ?";
            db.query(updateOrderQuery, [index + 1, task.id], (err) => {
              if (err) reject(err);
              resolve();
            });
          });
        }
        return Promise.resolve();
      });

      Promise.all(updateQueries)
        .then(() => {
          return res.status(200).json(`Ordem das Tarefas atualizadas com sucesso.`);
        })
        .catch(err => {
          return res.status(500).json(err);
        });
    });
  });
}

export const updateTarefas = (req, res) => {
  const { id } = req.params;
  const { name, cost, date, ordem } = req.body;
  const q =
    "UPDATE tarefas SET `nome_tarefas` = ?, `custo` = ?, `data_limite` = ?, `ordem` = ? WHERE `id` = ?";

    const values = [name, cost, date, ordem, id];

  db.query(q, values, (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Tarefa atualizada com sucesso.");
  });
};

export const deleteTarefas = (req, res) => {
  const { id } = req.params;
  const q = "DELETE FROM tarefas WHERE `id` = ?";

  db.query(q, id, (err) => {
    if (err) return res.status(500).res.json(err);

    const selectQuery = "SELECT * FROM tarefas ORDER BY `ordem`";
    db.query(selectQuery, (err, tasks) => {
      if (err) return res.status(500).json(err);

      const updateQueries = tasks.map((task, index) => {
        const newOrder = index + 1;
        if (task.order !== newOrder) {
          return new Promise((resolve, reject) => {
            const updateQuery = "UPDATE tarefas SET `ordem` = ? WHERE id = ?";
            db.query(updateQuery, [newOrder, task.id], (err) => {
              if (err) reject(err);
              resolve();
            });
          });
        }
        return Promise.resolve(); 
      });

      Promise.all(updateQueries)
        .then(() => {
          return res.status(200).json(`Tarefa deletada e ordens atualizadas com sucesso.`);
        })
        .catch(err => {
          return res.status(500).json(err);
        });
    });
  });
};