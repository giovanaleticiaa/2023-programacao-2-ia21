import { Router } from "express"
import database from "../database"

const router = Router()

router.get("/", async (req, res) => {
  console.log("LER ITENS")
  const db = await database()
  const result = await db.all('SELECT * FROM todo')
  res.json(result)
})

router.get("/:id", async (req, res) => {
  console.log("LER ITEN")
  const db = await database()
  const result = await db.all('SELECT * FROM todo WHERE id=?', [req.params.id])
  res.json(result)
})

router.post("/", async (req, res) => {
  console.log("CRIAR NOVO ITEM")
  const db = await database()
  const result = await db.run('INSERT INTO todo(texto) VALUES(?)', [req.body.texto])
  res.json({ id: result.lastID })
})

router.put("/:id", async (req, res) => {
  console.log("ATUALIZAR TODOS OS ITENS")
  const db = await database()
  const result = await db.run('UPDATE todo SET texto=?,done=? WHERE id=?',[req.body.texto,req.body.done, req.params.id])
  res.json({ result })
})

router.patch("/:id", async (req, res) => {
  console.log("ATUALIZAR ITENS")
  const db = await database()
  const result = await db.run('UPDATE todo SET done=? WHERE id=?',[req.body.done, req.params.id])
  res.json({ result })
})

router.delete("/:id", async (req, res) => { 
  console.log("DELETAR ITENS")
  const db = await database()
  const result = await db.run('DELETE FROM todo WHERE id=?',[req.params.id])
  res.json({ result })
})

export default router