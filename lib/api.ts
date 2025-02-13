import axios from "axios";
import { fetchEventSource } from "@microsoft/fetch-event-source";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json", "X-API-KEY": apiKey },
});

export async function goChat(message: string): Promise<string> {
  try {
    const res = await api.post("/chat", { message });
    return res.data.response;
  } catch (error) {
    console.log(error);
    return "An error occurred while processing your message";
  }
}

export async function goStream(
  message: string,
  cb: (chunk: string) => void
): Promise<void> {
  const ctrl = new AbortController();

  return new Promise((resolve, reject) => {
    fetchEventSource("http://localhost:8080/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY || "",
      },
      body: JSON.stringify({
        message: message,
      }),
      signal: ctrl.signal,
      onmessage(event) {
        cb(event.data);
      },
      onerror(err) {
        reject(err);
      },
      onclose() {
        resolve();
      },
    });
  });
}
