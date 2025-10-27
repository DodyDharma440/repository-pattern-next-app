import axios from "axios";
import { NextRequest } from "next/server";

const requestHandler = async (req: NextRequest) => {
  const { method, headers } = req;
  let body;
  if (["POST", "PUT", "PATCH"].includes(method)) {
    const contentType = headers.get("content-type") ?? "";

    switch (contentType) {
      case "application/json":
        body = await req.json();
        break;
      case "multipart/form-data":
        body = await req.formData();
        break;
      case "application/x-www-form-urlencoded":
        const text = await req.text();
        body = new URLSearchParams(text);
        break;
      default:
        body = await req.text();
        break;
    }
  }

  const url = new URL(req.url);
  const backendPath = url.pathname.replace("/api/placeholder", "");
  const backendUrl = `https://jsonplaceholder.typicode.com${backendPath}${url.search}`;

  const authToken = req.cookies.get("some-nextjs-token")?.value ?? "";

  if (!authToken) {
    return new Response("Authentication token not found in cookies.", {
      status: 401,
    });
  }

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    host,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    connection,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cookie,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    authorization,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    "content-length": contentLength,
    ...filteredHeaders
  } = headers as any;

  try {
    const axiosRes = await axios(backendUrl, {
      method,
      headers: {
        ...filteredHeaders,
        Authorization: `Bearer ${authToken}`,
      },
      data: body,
    });

    return Response.json(axiosRes.data, { status: axiosRes.status });
  } catch (error: any) {
    // Tangani error dari backend
    if (error.response) {
      // Backend merespons dengan error
      return Response.json(error.response.data, {
        status: error.response.status,
      });
    } else if (error.request) {
      // Tidak ada respons dari backend
      console.error("No response from backend:", error.message);
      return Response.json(
        { message: "No response from backend server." },
        { status: 500 }
      );
    } else {
      // Error lainnya
      console.error("Request Error:", error.message);
      return Response.json(
        { message: "An error occurred while processing the request." },
        { status: 500 }
      );
    }
  }
};

export const GET = async (req: NextRequest) => {
  const res = await requestHandler(req);
  return res;
};

export const POST = async (req: NextRequest) => {
  const res = await requestHandler(req);
  return res;
};

export const PUT = async (req: NextRequest) => {
  const res = await requestHandler(req);
  return res;
};

export const PATCH = async (req: NextRequest) => {
  const res = await requestHandler(req);
  return res;
};

export const DELETE = async (req: NextRequest) => {
  const res = await requestHandler(req);
  return res;
};
