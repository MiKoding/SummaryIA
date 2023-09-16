import cors from "cors"
import express, { response } from "express"
//"-- watch" esta flag é usado para fazer atualização do servidor forma automatica
import { convert } from "./convert.js"
import { download } from "./download.js"
import { transcribe } from "./transcribe.js"
import { summarize } from "./summarize.js"
import { cat } from "@xenova/transformers"

const app = express()
app.use(express.json())
app.use(cors())

app.get("/summary/:id", async (request, response) => {
  try {
    await download(request.params.id) // sera aguardado a promessa do download ser atendida(promise)
    const audioConverted = await convert() // converte o audio para codigo, para o formato que a IA identifica.

    const result = await transcribe(audioConverted) // quando estava sem o AWAIT ficou enviando object object, aprenda com seus erros otario

    return response.json({ result })
  } catch (error) {
    console.log(error)
    return response.json({ error })
  }
})// essa request realiza a função de fazer o download, conversão do video para apenas audio e armazenamento na pasta .tmp, depois é realizado a conversão de audio para um formato que IA consiga ler para que logo em seguida a mesma transcreva o audio.

app.post("/summary", async (request, response) => {
  try {
    const result = await summarize(request.body.text)
    return response.json({ result })
  } catch (error) {
    console.log(error)
    return response.json({ error })
  }
})
app.listen(3333, () => console.log("server is running")) //porta usada no localhost é 3333
