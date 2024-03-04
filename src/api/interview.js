import apiRequest from '../utils/ApiRequest';

async function login() {
  const response = await apiRequest('/login_to_session', 'POST');
  return response
}

async function getQuestion() {
  const response = await apiRequest('/question', 'POST');
  return response.question
}

async function audioAnswer({ audioFile }) {
  const audioBlob = await fetch(audioFile).then(response => response.blob());
  const formData = new FormData();
  formData.append('audio_file', audioBlob, 'audio.wav');
  formData.set('Content-Type', audioBlob.type);
  const response = await apiRequest('/audio_answer', 'POST', formData);
  return response
}

async function codeAnswer({ userCode }) {
  const formData = new FormData();
  formData.append('user_code', userCode);

  const response = await apiRequest('/code_answer', 'POST', formData);
  return response
}

async function getHint({ code = 'no code' }) {
  const formData = new FormData()
  formData.append('code', code)
  
  const response = await apiRequest('/hint', 'POST', formData);
  return response
}

async function getReport() {
  const response = await apiRequest('/report', 'POST');
  return response
}

async function deleteSession() {
  const response = await apiRequest('/delete_session', 'POST');
  return response
}

const interviewApi = {
  login,
  getQuestion,
  audioAnswer,
  codeAnswer,
  getHint,
  getReport,
  deleteSession
}

export default interviewApi