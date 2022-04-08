import axios from "axios";

export async function getTransformations() {
  return (await axios.get(`http://localhost:8000/api/v1/transformation-rules`)).data;
}

export async function getTransformation(transformationId) {
  return (await axios.get(`http://localhost:8000/api/v1/transformation-rules/${transformationId}`)).data;
}

export async function addTransformation(transformation) {
  return (await axios.post(`http://localhost:8000/api/v1/transformation-rules`, transformation)).data;
}

export async function updateTransformation(transformation) {
  return (await axios.put(`http://localhost:8000/api/v1/transformation-rules/${transformation.id}`, transformation)).data;
}

export async function deleteTransformation(transformationId) {
  return (await axios.delete(`http://localhost:8000/api/v1/transformation-rules/${transformationId}`)).data;
}