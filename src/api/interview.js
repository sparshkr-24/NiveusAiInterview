import apiRequest from '../utils/ApiRequest';

async function login() {
  const response = await apiRequest('/login_to_session', 'POST');
  return response
}

async function getQuestion() {
  console.log('api called');
  const response = await apiRequest('/question', 'POST');
  return response.question
}

async function audioAnswer({audioFile}) {
  const body = {
    audio_file: audioFile
  }
  const response = await apiRequest('/audio_answer', 'POST', body);
  return response
}

async function codeAnswer({userCode}) {
  const body = {
    user_code: userCode
  }
  const response = await apiRequest('/code_answer', 'POST', body);
  return response
}

async function getHint({code}) {
  const body = {
    code
  }
  const response = await apiRequest('/hint', 'POST', body);
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