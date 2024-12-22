import { toast } from "react-toastify";

export function makeid(length: number) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
export function filterById(jsonObject: any, id: number) {
  return jsonObject.filter(function (jsonObject: any) {
    return jsonObject.id == id;
  })[0];
}

export function getNumber(number: number): number {
  if (number) return parseFloat(number.toFixed(2));
  else return 0;
}

export function showSuccess(text: string) {
  const notify = () => toast.success(text);
  notify();
}

export function showError(text: string) {
  const notify = () => toast.error(text);
  notify();
}

export function convertTimeToHoursWithDecimals(timeString: string): number {
  // Split the time string into hours and minutes
  const [hoursStr, minutesStr] = timeString.split(":");

  // Convert hours and minutes to numbers
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  // Calculate total time in decimal hours
  const decimalHours = hours + minutes / 60;
  return decimalHours;
}

export function subtractHoursMinutes(hora1: string, hora2: string) {
  // Convertir las horas y minutos a números
  const [horas1, minutos1] = hora1.split(":").map(Number);
  const [horas2, minutos2] = hora2.split(":").map(Number);
  /*   let hora; */

  // Restar los minutos
  let minutosRestantes = minutos1 - minutos2;

  // Si los minutos son negativos, pedir prestado una hora
  if (minutosRestantes < 0) {
    minutosRestantes += 60;
    /*  hora = horas1 - 1; // Declaramos una nueva variable local 'horas1' y le asignamos el valor decrementado */
  }

  // Restar las horas
  const horasRestantes = horas1 - horas2;

  // Formatear el resultado
  return `${horasRestantes.toString().padStart(2, "0")}:${minutosRestantes
    .toString()
    .padStart(2, "0")}`;
}

export function addHoursMinutes(hora1: string, hora2: string): string {
  // Convertir las horas y minutos a números
  const [horas1, minutos1] = hora1.split(':').map(Number);
  const [horas2, minutos2] = hora2.split(':').map(Number);

  // Sumar los minutos
  let minutosTotales = minutos1 + minutos2;

  // Si los minutos superan 60, llevar una hora
  if (minutosTotales >= 60) {
    minutosTotales -= 60;
  }

  // Sumar las horas
  const horasTotales = horas1 + horas2;

  // Formatear el resultado
  return `${horasTotales.toString().padStart(2, "0")}:${minutosTotales
    .toString()
    .padStart(2, "0")}`;
}

export function majorHour(hora1: string, hora2: string): string {
  // Convertir las horas y minutos a números
  const [horas1, minutos1] = hora1.split(":").map(Number);
  const [horas2, minutos2] = hora2.split(":").map(Number);

  // Convertir ambas horas a minutos para una comparación más sencilla
  const totalMinutos1 = horas1 * 60 + minutos1;
  const totalMinutos2 = horas2 * 60 + minutos2;

  // Comparar los minutos totales y devolver la hora mayor
  if (totalMinutos1 > totalMinutos2) {
    return hora1;
  } else if (totalMinutos2 > totalMinutos1) {
    return hora2;
  } else {
    // Si ambas horas son iguales, puedes devolver cualquiera de las dos o un mensaje indicando igualdad
    return "Ambas horas son iguales";
  }
}

export function calculateServiceYears(dateAdmission:any) {
  /**
   * Calculates the number of service years from an admission date.
   *
   * @param {Date} dateAdmission - The admission date.
   * @returns {number} The number of service years.
   */
  // Convert the date to a Date object if it's a string
  const admissionDate = typeof dateAdmission === 'string' ? new Date(dateAdmission) : dateAdmission;

  if (!(admissionDate instanceof Date)) {
    throw new Error('dateAdmission must be a Date object or a string');
  }

  const today = new Date();
  let years = today.getFullYear() - admissionDate.getFullYear();

  // If the current month is before the birth month, or if it's the same month but before the birth day,
  // subtract a year.
  if (today.getMonth() < admissionDate.getMonth() || 
      (today.getMonth() === admissionDate.getMonth() && today.getDate() < admissionDate.getDate())) {
    years--;
  }

  return years;
}