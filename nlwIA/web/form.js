import { server } from "./server.js"
const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")
  console.log("dados enviados")

  const videoURL = input.value
  if (!videoURL.includes("shorts")) {
    return (content.textContent = "Este video não é um shorts")
  }

  const [_, params] = videoURL.split("/shorts/")
  const [videoID] = params.split("?si") //retira o si e seleciona o primeiro colocado na splitagem
  content.textContent = "Obtendo o texto do áudio..."

  const transcription = await server.get("/summary/" + videoID)

  content.textContent = "Realizando o resumo..."

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  content.classList.remove("placeholder")
  content.textContent = summary.data.result
})
