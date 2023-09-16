import ytdl from "ytdl-core"
import fs from "fs"
// ytdl é a biblioteca que trabalha com download e conversão de videos do youtube
// fs é um biblioteca que ja vem no node
//promise > foi usado para usar o await no index.js na função, ela contem uma promessa que é trazer o resultado.
export const download = (videoId) =>
  new Promise((resolve, reject) => {
    const videoURL = "https://www.youtube.com/shorts/" + videoId
    console.log("Realizando o donwload do video:" + videoId)

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000
        if (seconds > 60) {
          throw new Error("A duração desse video é maior que 60 segundos")
        }
      })
      .on("end", () => {
        console.log("Download do video finalizado.")
        resolve()
      })
      .on("error", (error) => {
        console.log(
          "Não foi possivel realizar o download do video. Detalhes do erro:",
          error
        )
        reject(error)
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4")) // realiza o donwload do video capturando a url + id
  })
