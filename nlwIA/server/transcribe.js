import { transcriptionExample } from "./utils/transcription.js"
import { pipeline } from "@xenova/transformers"

export async function transcribe(audio) {
  //  return transcriptionExample
  try {
    console.log(audio)
    console.log("Realizando a transcrição do vídeo...")
    const transcribe = await pipeline(
      "automatic-speech-recognition",
      "Xenova/whisper-small"
    )
    const transcription = await transcribe(audio, {
      chunk_length_s: 30,
      stride_length_s: 5,
      language: "portuguese",
      task: "transcribe",
    })

    console.log("Transcrição finalizada com sucesso.")
    console.log(transcription.text)
    return transcription?.text.replace("[Música]", "")
  } catch (error) {
    throw new Error(error)
  }
}