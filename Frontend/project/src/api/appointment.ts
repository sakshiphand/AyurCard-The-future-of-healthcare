import axios from "axios";

const API_URL = "http://localhost:5000/api/appointments/";

export const bookAppointment = (data: any) =>
  axios.post(API_URL + "book", data);