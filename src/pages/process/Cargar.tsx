import { useEffect, useState } from "react";
import CustomInputs from "../../components/forms/CustomInputs";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  deleteTime,
  editTime,
  getAccountants,
  getCompanyWithEmployer,
  getCounterFoil,
  getFixedTaxes,
  setTime,
  getSumFixedTaxesByID,
} from "../../utils/requestOptions";
import { useParams } from "react-router-dom";
import { COMPANY_DATA } from "../../models/company";
import { EMPLOYER_DATA } from "../../models/employeer";
import { TIME_DATA } from "../../models/time";
import {
  convertTimeToHoursWithDecimals,
  filterById,
  getNumber,
  showError,
  showSuccess,
  subtractHoursMinutes,
  addHoursMinutes,
  majorHour,
} from "../../utils/functions";
import { TAXES, TAXES_DATA } from "../../models/taxes";
import { FIXEDTAXES_DATA } from "../../models/fixedTaxes";
import { SUM_DATA } from "../../models/sumTaxes";
import ModalAlert from "../../components/dashboard/ModalAlert";

const Cargar = () => {
  const params = useParams();
  const [loanding, setLoanding] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(0);
  const [year, setYear] = useState(() => {
    const currentYear = new Date().getFullYear().toString(); // Convertimos el año a string
    return currentYear;
  });
  const [employerData, setEmployerData] = useState(EMPLOYER_DATA);
  const [companyData, setCompanyData] = useState(COMPANY_DATA);
  const [timesData, setTimesData] = useState([TIME_DATA]);
  const [formData, setFormData] = useState(TIME_DATA);
  const [accountants, setAccountants] = useState([]);
  const [times, setTimes] = useState([TIME_DATA]);
  const [total, setTotal] = useState(0);


  const [taxesData, setTaxesData] = useState([TAXES_DATA]);
  const [fixedTaxesData, setFixedTaxesData] = useState([FIXEDTAXES_DATA]);

  const [period, setPeriod] = useState(0);
  const [flag, setFlag] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const [idEmployer, setIdEmployer] = useState(0);
  const [employers, setEmployers] = useState([]);
  const [message, setMessage] = useState("");
  const [vacationTimeInit, setVacationTimeInit] = useState("");
  const [sickTimeInit, setSickTimeInit] = useState("");

  const [sumTaxes, setSumTaxes] = useState(SUM_DATA);

  const [isOpen2, setIsOpen2] = useState(false);
  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleModal2 = () => {
    setIsOpen2(!isOpen2);
  };

  const recalculate = (id: number = 0) => {
    let regular_amount = 0;
    let over_amount = 0;
    let salary = 0;
    let accountant_id = 0;
    let tax_pr_percent = 0;
    let today  = new Date();
    let pay_date : any;
    let retention_type : any;
    
  
    let meal_amount = 0;
    if (formData.id == 0) {
      pay_date = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      retention_type = employerData.retention_type;
      salary = employerData.salary;
      accountant_id = companyData.accountant_id;
      tax_pr_percent = Number(employerData.payment_percentage.replace("%", ""));

      regular_amount = employerData.regular_time;
      over_amount = employerData.overtime;
      meal_amount = employerData.mealtime;
    } else {
      pay_date= formData.pay_date;
      salary = formData.salary;
      if (formData.tax_pr_percent == null || formData.tax_pr_percent == 0){
        tax_pr_percent = Number(employerData.payment_percentage.replace("%", ""));
      }else{
        tax_pr_percent = formData.tax_pr_percent;
      }
      console.log(formData.retention_type);
      
      if (formData.retention_type)
      retention_type = formData.retention_type;
      else
      retention_type = employerData.retention_type;

      accountant_id = formData.accountant_id;
      regular_amount = formData.regular_amount;
      over_amount = formData.over_amount;
      meal_amount = formData.meal_amount;
    }
    let _id;
    if (id == 0) _id = formData.id;
    else _id = id;

    const regular_pay =
      regular_amount * convertTimeToHoursWithDecimals(formData.vacation_time) +
      regular_amount * convertTimeToHoursWithDecimals(formData.sick_time) +
      regular_amount * convertTimeToHoursWithDecimals(formData.holiday_time) +
      getNumber(formData.tips) +
      getNumber(formData.salary) +
      getNumber(formData.bonus) +
      getNumber(formData.others) +
      getNumber(formData.commissions) +
      getNumber(formData.concessions) +
      regular_amount * convertTimeToHoursWithDecimals(formData.regular_time) +
      over_amount * convertTimeToHoursWithDecimals(formData.over_time) +
      meal_amount * convertTimeToHoursWithDecimals(formData.meal_time);
    let aux: any = [];

    let inabilityAmount = 0;
    let inability = 0;
    if (formData.id == 0){
      const taxeInability = fixedTaxesData.find((tax) => tax.id === 1);
      if (taxeInability) {
        inabilityAmount = taxeInability.amount;
  
        if (employerData.choferil != "SI") {
          inability = regular_pay * (inabilityAmount / 100);
  
          if (total >= 27  ) inability = 0;
          else{
            if (total + inability >  27)
              inability = inability- (total + inability - 27);
            
          } 

          
        }
      }
    }else{
      inability = formData.inability;
      

    }
    

    let medicareAmount = 0;
    let medicare = 0;
    const taxeMedicare = fixedTaxesData.find((tax) => tax.id === 2);
    if (taxeMedicare) {
      medicareAmount = taxeMedicare.amount;
      medicare = regular_pay * (medicareAmount / 100);
      if (sumTaxes.total_medicare >= taxeMedicare.limit ) medicare = 0;
      else if (sumTaxes.total_medicare + medicare > taxeMedicare.limit)
        medicare = taxeMedicare.limit - sumTaxes.total_medicare;
    }

    let secureSocialAmount = 0;
    let secure_social = 0;
    const taxeSecureSocial = fixedTaxesData.find((tax) => tax.id === 3);

    if (taxeSecureSocial) {
      secureSocialAmount = taxeSecureSocial.amount;
      secure_social =
        (regular_pay - formData.tips) * (secureSocialAmount / 100);
      if (sumTaxes.total_secure_social >= taxeSecureSocial.limit)
        secure_social = 0;
      else if (
        sumTaxes.total_secure_social + secure_social >
        taxeSecureSocial.limit
      )
        secure_social = taxeSecureSocial.limit - sumTaxes.total_secure_social;
    }
    var exed_amount = 0;
    var withholdingValue = "";
    var count = 0;
    var amount = 0;
    if (employerData.period_norma == "1") {
      count = 52;
    }
    if (employerData.period_norma == "2") {
      count = 26;
    }
    if (employerData.period_norma == "4") {
      count = 12;
    }
    var exed_sum= 0;
   
    if (retention_type == 1){
      if (formData.id == 0) {
        withholdingValue = employerData.payment_percentage.replace("%", "");
      }else{
        withholdingValue = String(tax_pr_percent);
      }
    }
      
    else {
     
      amount = regular_pay * count;
      
      if (amount <= 12500) withholdingValue = "0";
      if (amount > 12500 && amount <= 25000) {
        withholdingValue = "7";
        exed_sum = 0;
        exed_amount = amount - 12500;
      }
      if (amount > 25000 && amount <= 41500) {
        withholdingValue = "14";
        exed_sum = 1120;

        exed_amount = amount - 25000;
      }
      if (amount > 41500 && amount <= 61500) {
        withholdingValue = "25";
        exed_sum = 3430;

        exed_amount = amount - 41500;
      }
     
      if (amount > 61500) {
        withholdingValue = "33";
        exed_sum = 8430;
        
        exed_amount = amount - 61500;
      }
    }
    
    let tax_pr = 0;
    if (formData.id == 0) {
    if (retention_type == 1)
      tax_pr = regular_pay * (Number(withholdingValue) / 100);
    else{
      tax_pr = (exed_amount * (Number(withholdingValue) / 100)) ;
      tax_pr = (tax_pr + exed_sum) / count;
    } 
   }else {
    tax_pr = formData.tax_pr
   }
    let socialTipsAmount = 0;
    let social_tips = 0;
    sumTaxes.total_social_tips;
    const taxeTipsSocial = fixedTaxesData.find((tax) => tax.id === 4);

    if (taxeTipsSocial) {
      socialTipsAmount = taxeTipsSocial.amount;
      social_tips = formData.tips * (socialTipsAmount / 100);
      if (sumTaxes.total_social_tips >= taxeTipsSocial.limit) social_tips = 0;
      else if (sumTaxes.total_social_tips + social_tips > taxeTipsSocial.limit)
        social_tips = taxeTipsSocial.limit - sumTaxes.total_social_tips;
    }

    let choferil = 0;
    const taxeChoferil = fixedTaxesData.find((tax) => tax.id === 5);
    if (taxeChoferil && employerData.choferil === "SI") {
      choferil = taxeChoferil.amount;
    }

    if (formData.id == 0)
      taxesData.map((item) => {
        item.value = setAmountTaxe(item, regular_pay);

        aux.push(item);
      });
    else aux = formData.payment;

    setFormData({
      ...formData,
      ["id"]: _id,
      ["tax_pr_percent"] : tax_pr_percent,
      ["payment"]: aux,
      ["salary"]: salary,
      ["retention_type"]: retention_type,

      ["accountant_id"]: accountant_id,
      ["inability"]: getNumber(inability),
      ["pay_date"] : pay_date,
      ["choferil"]: getNumber(choferil),
      ["medicare"]: getNumber(medicare),
      ["secure_social"]: getNumber(secure_social),
      ["tax_pr"]: getNumber(tax_pr),
      ["social_tips"]: getNumber(social_tips),
      ["holyday_pay"]: Number(
        regular_amount * convertTimeToHoursWithDecimals(formData.holiday_time)
      ),
      ["vacation_pay"]: Number(
        regular_amount * convertTimeToHoursWithDecimals(formData.vacation_time)
      ),
      ["sick_pay"]: Number(
        regular_amount * convertTimeToHoursWithDecimals(formData.sick_time)
      ),
      ["overtime_pay"]: Number(
        over_amount * convertTimeToHoursWithDecimals(formData.over_time)
      ),
      ["meal_time_pay"]: Number(
        meal_amount * convertTimeToHoursWithDecimals(formData.meal_time)
      ),
      ["regular_pay"]: Number(
        regular_amount * convertTimeToHoursWithDecimals(formData.regular_time) +
          formData.bonus +
          formData.others +
          salary
      ),
    });
  };

  useEffect(() => {
    console.log(formData);
    if (formData.id != 0) {
      recalculate(formData.id);
    }
  }, [formData.id]);

  useEffect(() => {
    if (formData.id == 0) {
      recalculate();
    }
  }, [
    formData.vacation_time,
    formData.over_time,
    formData.meal_time,
    selectedPeriod,
    formData.salary,
    formData.bonus,
    formData.others,

    formData.sick_time,
    formData.tips,
    formData.commissions,
    formData.concessions,
    formData.holiday_time,
    formData.regular_time,
  ]);

  useEffect(() => {
    setVacationTimeInit(formData.vacation_time);
    setSickTimeInit(formData.sick_time);
  }, [formData.id]);

  useEffect(() => {
    const messageArray = [];

    if (isOpen) {
      messageArray.push(
        `¿Esta seguro que desea cargar esta data por un monto de ${getTotal().toFixed(
          2
        )}?`
      );

      if (vacationTimeInit != formData.vacation_time) {
        if (vacationTimeInit == "00:00") {
          messageArray.push(`, Esta por pagar ${
            formData.vacation_time
          } de vacaciones el cual afecta al empleado que actualmente cuenta con ${
            employerData.vacation_time
          } horas de vacaciones
              actualizandolo a ${subtractHoursMinutes(
                employerData.vacation_time,
                formData.vacation_time
              )}`);
        } else {
          const newTime = subtractHoursMinutes(
            vacationTimeInit,
            formData.vacation_time
          );
          if (
            majorHour(vacationTimeInit, formData.vacation_time) ==
            vacationTimeInit
          ) {
            messageArray.push(`, Esta por disminuir el pago de vacaciones de ${vacationTimeInit} a ${
              formData.vacation_time
            }, lo cual afecta al empleado que actualmente cuenta con ${
              employerData.vacation_time
            } horas de vacaciones
                actualizandolo a ${addHoursMinutes(
                  employerData.vacation_time,
                  newTime
                )}`);
          } else {
            messageArray.push(`, Esta por aumentar el pago de vacaciones de ${vacationTimeInit} a ${
              formData.vacation_time
            }, lo cual afecta al empleado que actualmente cuenta con ${
              employerData.vacation_time
            } horas de vacaciones
                  actualizandolo a ${subtractHoursMinutes(
                    employerData.vacation_time,
                    newTime
                  )}`);
          }
        }
      }

      if (sickTimeInit != formData.sick_time) {
        if (sickTimeInit == "00:00") {
          messageArray.push(`, Esta por pagar ${
            formData.sick_time
          } horas de enfermedad el cual afecta al empleado que actualmente cuenta con ${
            employerData.vacation_time
          } horas de enfermedad
              actualizandolo a ${subtractHoursMinutes(
                employerData.sick_time,
                formData.sick_time
              )}`);
        } else {
          const newTime = subtractHoursMinutes(
            sickTimeInit,
            formData.sick_time
          );
          if (majorHour(sickTimeInit, formData.sick_time) == sickTimeInit) {
            messageArray.push(`, Esta por disminuir el pago de enfermedad de ${sickTimeInit} a ${
              formData.sick_time
            }, lo cual afecta al empleado que actualmente cuenta con ${
              employerData.sick_time
            } horas de enfermedad
                actualizandolo a ${addHoursMinutes(
                  employerData.sick_time,
                  newTime
                )}`);
          } else {
            messageArray.push(`, Esta por aumentar el pago de enfermedad de ${sickTimeInit} a ${
              formData.sick_time
            }, lo cual afecta al empleado que actualmente cuenta con ${
              employerData.sick_time
            } horas de  enfermedad
                  actualizandolo a ${subtractHoursMinutes(
                    employerData.sick_time,
                    newTime
                  )}`);
          }
        }
      }

      //employerData
      const messageOk = messageArray.join("\n");
      setMessage(messageOk);
    }
  }, [isOpen]);

  const getTotal = () => {
    var total = 0;

    const regular_pay =
      formData.vacation_pay +
      formData.sick_pay +
      formData.holyday_pay +
      getNumber(formData.tips) +
      getNumber(formData.commissions) +
      getNumber(formData.concessions) +
      formData.regular_pay +
      formData.overtime_pay +
      formData.meal_time_pay;
    let inability = 0;

    let medicare = 0;
    let secure_social = 0;

    let tax_pr = 0;
    let social_tips = 0;
    let choferil = 0;


    if (formData.id == 0) {
      inability = getNumber(formData.inability);
      medicare = getNumber(formData.medicare);
      secure_social = getNumber(formData.secure_social);

      tax_pr = getNumber(formData.tax_pr);
      social_tips = getNumber(formData.social_tips);
      choferil = getNumber(formData.choferil);
    } else {
      inability = formData.inability;
      medicare = formData.medicare;
      secure_social = formData.secure_social;

      tax_pr = formData.tax_pr;
      social_tips = formData.social_tips;
      choferil = formData.choferil;
    }
    total = regular_pay;
    
    total =
      total -
      getNumber(inability) -
      getNumber(medicare) -
      getNumber(secure_social) -
      getNumber(tax_pr) -
      getNumber(formData.medical_insurance) -
      getNumber(social_tips) -
      getNumber(choferil) -
      formData.donation +
      formData.refund -
      formData.asume -
      formData.aflac;

    if (formData.id == 0) {
      taxesData.map((item) => {
        if (item.is_active || item.required == 2) {
          item.value = setAmountTaxe(item, regular_pay);

          total = total + item.value;
        }
      });
    } else {
      formData.payment.map((item) => {
        let value = 0;
        if (item.type_amount == 1) {
          value = ((getPreTotal() * item.amount) / 100) * -1;
        } else {
          value = item.amount;
        }
        if (item.type_taxe == 1 && value > 0) {
          value = value * -1;
        }

        if (item.is_active || item.required == 2) total = total + value;
      });
    }
    if (total > 0) return total;
    else return 0;
  };
  const getCreatedAt = (date: any): string => {
    if (!date) return ""; // Handle null or undefined
  
    if (typeof date === "string") {
      // Check if the string is in ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
      if (date.includes("T")) {
        return date.split("T")[0]; // Extract the date part
      } else if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
          return date; // Already in YYYY-MM-DD format
      } else {
          return ""; // Invalid date format
      }
    } else if (date instanceof Date) {
      return date.toISOString().split("T")[0];
    } else {
      return ""; // Handle other unexpected types
    }
  };
  
  const getPreTotal = () => {
    var total = 0;
    const regular_pay =
      formData.vacation_pay +
      formData.sick_pay +
      formData.holyday_pay +
      getNumber(formData.tips) +
      getNumber(formData.commissions) +
      getNumber(formData.concessions) +
      formData.regular_pay +
      formData.overtime_pay +
      formData.meal_time_pay;
    total = regular_pay;

    return total;
  };

  const generateFile = () => {
    setLoanding(true);

    getCounterFoil(
      Number(params.id_company),
      idEmployer,
      formData.id,
      filterById(timesData, period),
      employerData
    )
      .then(() => {
        // Data retrieval and processing
        setLoanding(false);

        showSuccess("Creado exitosamente.");
      })
      .catch((error) => {
        setLoanding(false);
        // If the query fails, an error will be displayed on the terminal.
        showError(error.response.data.detail);
      });
  };

  const handleInputChange = (e: React.FormEvent<any>) => {
    if (e.currentTarget.type === "number" && e.currentTarget.value == null) {
      e.currentTarget.value = "0";
    }
  
    let value = e.currentTarget.value;
  
    if (e.currentTarget.type === "date") {
      // Format the date to YYYY-MM-DD (no timestamp)
      const date = new Date(e.currentTarget.value);
      value = date.toISOString().split("T")[0];
    }
  
    setFormData({
      ...formData,
      [e.currentTarget.name]:
        e.currentTarget.type === "number"
          ? parseFloat(value)
          : value,
    });
  };
  const handleInputTimeChange = (
    e: React.FormEvent<HTMLInputElement>,
    time: any,
    target: any
  ) => {
    let value = "";

    if (e.currentTarget.name.includes("hours")) {
      if (e.currentTarget.value == "") value = "00";
      else value = e.currentTarget.value;
      value = value + ":" + time.split(":")[1];
    }
    if (e.currentTarget.name.includes("min")) {
      if (e.currentTarget.value == "") value = "00";
      else value = e.currentTarget.value;
      if (parseInt(e.currentTarget.value) >= 60) value = "59";
      value = time.split(":")[0] + ":" + value;
    }

    setFormData({
      ...formData,
      [target]: value + "",
    });
  };

  const handleitem = (e: React.FormEvent<HTMLInputElement>, item: TAXES) => {
    // Crea un nuevo objeto con el cambio

    item.value = parseFloat(e.currentTarget.value);
    item.edited = true;
    item.amount = parseFloat(e.currentTarget.value);

    const updatedItem = { ...item };

    // Crea un nuevo array con el item actualizado
    const updatedTaxesData = taxesData.map((el) =>
      el === item ? updatedItem : el
    );

    // Actualiza el estado con el nuevo array
    setTaxesData(updatedTaxesData);

    setFormData({
      ...formData,
      ["payment"]: taxesData,
    });
  };

  const handleCheck = (e: React.FormEvent<HTMLInputElement>, item: TAXES) => {
    // Crea un nuevo objeto con el cambio

    const isActive = e.currentTarget.checked;

    item.is_active = isActive;

    const updatedItem = { ...item, is_active: isActive };

    // Crea un nuevo array con el item actualizado
    if (formData.id == 0) {
      const updatedTaxesData = taxesData.map((el) =>
        el === item ? updatedItem : el
      );

      // Actualiza el estado con el nuevo array
      setTaxesData(updatedTaxesData);

      setFormData({
        ...formData,
        ["payment"]: taxesData,
      });
    } else {
      // Crea un nuevo array con el item actualizado
      const updatedPayment = formData.payment.map((el) =>
        el === item ? updatedItem : el
      );
      setFormData({
        ...formData,
        ["payment"]: updatedPayment,
      });
    }
  };

  const setAmountTaxe = (taxe: TAXES, regular_pay: number) => {
    if (taxe.type_amount == 1) {
      if (!taxe.edited) taxe.value = regular_pay * (taxe.amount / 100);
    } else {
      if (!taxe.edited) taxe.value = taxe.amount;
    }
    if (taxe.type_taxe == 1 && taxe.value > 0) {
      if (taxe.value > 0) taxe.value = taxe.value * -1;
    }

    return taxe.value;
  };

  const handlePeriodChange = (e: React.FormEvent<any>) => {
    const value = e.currentTarget.value;
    setPeriod(value);
    let times = [];
    times = filterById(timesData, value).times;
    setSelectedPeriod(filterById(timesData, value).id);
    if (times.length > 0 && value > 0) {
      setFormData({ ...times[0], period_id: filterById(timesData, value).id });
      setTimes(times);
    } else {
      setTimes([TIME_DATA]);

      setFormData({ ...TIME_DATA, period_id: filterById(timesData, value).id });
    }
  };

  const handleTimeChange = (e: React.FormEvent<any>) => {
    const value = e.currentTarget.value;
    var timeEncontrado: any = times.find((time) => time.id == Number(value));

    setFormData({ ...timeEncontrado, period_id: selectedPeriod });
  };
  const addTime = () => {
    let aux_times = times;
    aux_times.push(TIME_DATA);
    setTimes(aux_times);
    setFormData({ ...TIME_DATA, period_id: selectedPeriod });
  };

  const setPeriodChange = () => {
    const value = period;

    setPeriod(value);
    let times = [];
    if (timesData){
      if (filterById(timesData, value)) times = filterById(timesData, value).times;
      else times = [TIME_DATA];
    } 

    setSelectedPeriod(filterById(timesData, value).id);
    if (times.length > 0 && value > 0) {
      setFormData({ ...times[0], period_id: filterById(timesData, value).id });
      setTimes(times);
    } else {
      setTimes([TIME_DATA]);
      setFormData({ ...TIME_DATA, period_id: filterById(timesData, value).id });
    }
  };

  const handleChangeEmployer = (e: React.FormEvent<any>) => {
    const value = e.currentTarget.value;
    setIdEmployer(Number(value));
    resetData(Number(value));
  };

  const handleYearChange = (e: React.FormEvent<any>) => {
    const value = e.currentTarget.value;
    setYear(value);
  };
  useEffect(() => {
    if (Number(year) != 0)
      getData(idEmployer);
  }, [year]);
  const handleCreate = () => {
    

    if (formData.id == 0) {
      
     
      if (selectedPeriod == 0)
        return showError("Por favor seleccione el Periodo");

      setLoanding(true);
      setTime(formData, idEmployer)
        .then(() => {
          // Data retrieval and processing
          setLoanding(false);
          resetData(idEmployer);
          handleModal();
          showSuccess("Creado exitosamente.");
        })
        .catch((error) => {
          setLoanding(false);
          resetData(idEmployer);
          handleModal();
          // If the query fails, an error will be displayed on the terminal.
          showError(error.response.data.detail);
          setLoanding(false);
        });
    } else {

      
     
      if (selectedPeriod == 0)
        return showError("Por favor seleccione el Periodo");

      setLoanding(true);
      editTime(formData, Number(formData.id))
        .then(() => {
          // Data retrieval and processing

          setLoanding(false);
          resetData(idEmployer);
          handleModal();
          showSuccess("Editado exitosamente.");
        })
        .catch((error) => {
          // If the query fails, an error will be displayed on the terminal.
          showError(error.response.data.detail);
          setLoanding(false);
        });
    }
  };


  const getAmountTaxe = (taxe: TAXES) => {
    if (taxe.type_amount == 1) return (getPreTotal() * taxe.amount) / 100;
    else return taxe.value;
  };

  const getAmountTaxe2 = (taxe: TAXES) => {
    if (taxe.type_amount == 1) return (getPreTotal() * taxe.amount) / 100;
    else return taxe.value;
  };

  const handleDelete = () => {
    setLoanding(true);
    deleteTime(formData.id)
      .then(() => {
        // Data retrieval and processing
        setLoanding(false);
        handleModal2();
        getData(idEmployer);

        showSuccess("Eliminado exitosamente.");
      })
      .catch((error) => {
        setLoanding(false);
        // If the query fails, an error will be displayed on the terminal.
        showError(error.response.data.detail);
      });
  };

  
  const getData = (id_employer: any) => {
    setLoanding(true);
    getCompanyWithEmployer(Number(params.id_company), id_employer, year)
      .then((response) => {
        // Data retrieval and processing
        setLoanding(false);
        if (formData.id == 0) {
          setEmployerData(response.data.result.employer);
          setCompanyData(response.data.result.company);
          setEmployers(response.data.result.employers);
          setTaxesData(response.data.result.taxes);
        } else {
          setFlag(flag + 1);
        }
        setTotal(response.data.result.total)
        setTimesData([]);

        setTimesData([...response.data.result.periods]);
      })
      .catch(() => {
        // If the query fails, an error will be displayed on the terminal.
      });
  };

  

  const resetData = (id_employer: any) => {
    setLoanding(true);
    getCompanyWithEmployer(Number(params.id_company), id_employer, year)
      .then((response) => {
        // Data retrieval and processing
        setLoanding(false);
        setEmployerData(response.data.result.employer);
        setTimesData([]);
        setTotal(response.data.result.total)
        setTimesData([...response.data.result.periods]);

        setFlag(flag + 1);
      })
      .catch(() => {
        // If the query fails, an error will be displayed on the terminal.
      });
  };

  useEffect(() => {
    if (flag > 0) {
      setPeriodChange();

      setTimeout(() => {
        const value = period;

        setPeriod(value);
        let times = [];
        if (timesData) times = filterById(timesData, value).times;
        console.log(times[0]);
        setFormData({
          ...times[0],
          id: times[0].id,
          period_id: filterById(timesData, value).id,
        });
      }, 1000);
    }
  }, [timesData]);

  useEffect(() => {
    if (period != 0) {
      setTimeout(() => {
        const value = period;

        setPeriod(value);
        let times = [];

        if (timesData) times = filterById(timesData, value).times;
        if (times[0] != null) recalculate(times[0].id);
      }, 1000);
    }
  }, [period]);

  useEffect(() => {
    getAccountants()
      .then((response) => {
        setLoanding(false);

        // Data retrieval and processing
        setAccountants(response.data.result);
      })
      .catch((error) => {
        // If the query fails, an error will be displayed on the terminal.
        setLoanding(false);

        showError(error.response.data.detail);
      });
    setIdEmployer(Number(params.id_employer));
    getData(Number(params.id_employer));

    getFixedTaxes().then((response) => {
      setFixedTaxesData(response.data.result);
    });
    getSumFixedTaxesByID(Number(params.id_employer)).then((response) => {
      setSumTaxes(response.data.result);
    });
  }, []);

  return (
    <>
      <div className="text-[#EED102] bg-[#333160] p-6 rounded-lg text-center">
        <h3 className="text-2xl">Cargar Tiempo</h3>
        <select
          name="year"
          onChange={handleYearChange}
          value={year}
          className={` bg-gray-50 border xl:w-2/12 mt-4  w-full pe-1 border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 inline-block  p-3`}
        >
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
          <option value="2029">2029</option>
          <option value="2030">2030</option>
        </select>
        <p className="text-white mt-4">Seleccionar período de trabajo</p>
        <div
          className={` justify-center block mb-2 text-sm font-medium text-gray-700 xl:w-2/3 xl-full mx-auto mt-4 flex xl:flex-row flex-col gap-2 align-middle items-center`}
        >
          <select
            name="period"
            onChange={handlePeriodChange}
            value={selectedPeriod}
            className={` bg-gray-50 border xl:w-2/5  w-full pe-1 border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 inline-block  p-3`}
          >
            <option value={-1}>Seleccione una opción</option>
            {timesData.map((item: any, i: number) => (
              <option key={item.id} value={item.id}>
                Periodo {i + 1} - {item.period_start} - {item.period_end}
              </option>
            ))}
          </select>
          <select
            name="id"
            onChange={handleTimeChange}
            value={formData.id}
            className={` bg-gray-50  border  xl:w-2/12 w-full xl:ms-2 border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 inline-block  p-3`}
          >
            {times.map((item: any, i: number) => (
              <option key={item.id} value={item.id}>
                Time {i + 1}
              </option>
            ))}
          </select>

          <div className="xl:w-1/6 w-full inline-block  ">
            <button
              className="rounded-lg  px-4 h-[44px] py-0 font-bold bg-[#FED102] xl:ms-2 w-[100%] content-center items-center"
              onClick={addTime}
            >
              {" "}
              <FontAwesomeIcon icon={faPlus} className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full  mt-4 bg-white rounded-lg shadow p-4 ">
     
        <div className="xl:w-full w-full flex items-center justify-center    gap-2 ">
          <CustomInputs
            class="xl:w-1/3 w-full mx-auto   inline-block "
            label=""
            disabled={true}
            value={companyData.name}
            placeholder=""
            type="text"
          />

          <select
            name="employers"
            onChange={handleChangeEmployer}
            value={idEmployer}
            className={`xl:w-1/3 w-full bg-gray-50 h-[42px]  border inline-block  border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-[0.7em]`}
          >
            <option value={-1}>Seleccione una opción</option>
            {employers.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.first_name + " " + item.last_name}
              </option>
            ))}
          </select>
          <select
            name="accountant_id"
            onChange={handleInputChange}
            value={formData.accountant_id}
            className={`xl:w-1/3 w-full xl:mt-0 mt-2 h-[42px] bg-gray-50  border inline-block  border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-[0.7em] `}
          >
            <option value={-1}>Seleccione una opción</option>
            {accountants
              .filter((item: any) => !item.is_deleted) // Filter out deleted accountants
              .map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.name + " " + item.first_last_name}
                </option>
              ))}
          </select>
          
           
          
        </div>
        <div className="xl:w-full w-full flex items-center justify-center  border rounded-lg border-gray-500 p-2 gap-2 ">

            <div  className={`xl:w-1/3 w-full `}>
            <label className="block" htmlFor="">
                Fecha de Pago
              </label>
              <input
            name="pay_date"
            onChange={handleInputChange}
            
            type="date"
            value={getCreatedAt(formData.pay_date)}
            className={` w-full xl:mt-0 mt-2 h-[42px] bg-gray-50  border inline-block  border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-[0.7em] `}
          />
            </div>
            {formData.retention_type == 1 && (
            <div className={`xl:w-1/3 w-full `}>
              <label className="block" htmlFor="">
                Porcentaje de TAX PR
              </label>
              <input
                name="employer_retained"
                onChange={handleInputChange}
                type="text"
                value={formData.employer_retained}
                className={` w-full xl:mt-0 mt-2 h-[42px] bg-gray-50  border inline-block  border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-[0.7em] `}
              />
            </div>
          )}
          {formData.retention_type == 2 && (
            <div className={`xl:w-1/3 w-full `}>
              <label className="block" htmlFor="">
                Tipo de Retencion
              </label>
              <input
                name="retention_type"
           
                type="text"
                value="Tabla"
                className={` w-full xl:mt-0 mt-2 h-[42px] bg-gray-50  border inline-block  border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-[0.7em] `}
              />
            </div>
          )}
          
            <div  className={`xl:w-1/3 w-full `}>
            <label className="block" htmlFor="">
                Fecha de Creacion
              </label>
              <input
            name="created_at"
            onChange={handleInputChange}
            type="date"
            readOnly
            value={getCreatedAt(formData.created_at)}
            className={` w-full xl:mt-0 mt-2 h-[42px] bg-gray-50  border inline-block  border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-[0.7em] `}
          />
            </div>
           
          
        </div>
        <div className="flex flex-col xl:flex-row gap-4 mt-4">
          <div className="xl:w-1/3 w-full border rounded-lg border-gray-500 p-2 ">
            <h2 className="mt-2 text-center text-2xl">Horas</h2>
            <hr className="mt-2 mb-4" />
            <div className="w-1/2  mx-auto  inline-block  ">
              <label className="block" htmlFor="">
                Horas Regulares
              </label>
              <CustomInputs
                class="w-5/12 mx-auto text-center inline-block time-input "
                label=""
                inputCss="text-center"
                name="regular_hours"
                onChange={(e) =>
                  handleInputTimeChange(
                    e,
                    formData.regular_time,
                    "regular_time"
                  )
                }
                value={formData.regular_time.split(":")[0]}
                placeholder=""
                type="text"
              />
              <div className="w-1/6 inline-block text-center time-separator">
                :
              </div>
              <CustomInputs
                class="w-5/12 mx-auto   inline-block time-input "
                label=""
                onChange={(e) =>
                  handleInputTimeChange(
                    e,
                    formData.regular_time,
                    "regular_time"
                  )
                }
                inputCss="text-center"
                name="regular_min"
                value={formData.regular_time.split(":")[1]}
                placeholder=""
                type="text"
              />
            </div>
            <div className="w-1/2  mx-auto ps-1 inline-block  ">
              <label className="block" htmlFor="">
                Horas de Overtime
              </label>
              <CustomInputs
                class="w-5/12 mx-auto pe-1 text-center  inline-block time-input "
                label=""
                inputCss="text-center"
                name="over_hours"
                onChange={(e) =>
                  handleInputTimeChange(e, formData.over_time, "over_time")
                }
                value={formData.over_time.split(":")[0]}
                placeholder=""
                type="text"
              />
              <div className="w-1/6 inline-block text-center time-separator">
                :
              </div>
              <CustomInputs
                class="w-5/12 mx-auto ps-1  inline-block time-input"
                label=""
                inputCss="text-center"
                name="over_min"
                onChange={(e) =>
                  handleInputTimeChange(e, formData.over_time, "over_time")
                }
                value={formData.over_time.split(":")[1]}
                placeholder=""
                type="text"
              />
            </div>
            <div className="w-1/2  mx-auto ps-1 inline-block  ">
              <label className="block" htmlFor="">
                Horas de Almuerzo
              </label>
              <CustomInputs
                class="w-5/12 mx-auto pe-1 text-center  inline-block time-input"
                label=""
                inputCss="text-center"
                name="meal_hours"
                onChange={(e) =>
                  handleInputTimeChange(e, formData.meal_time, "meal_time")
                }
                value={formData.meal_time.split(":")[0]}
                placeholder=""
                type="text"
              />
              <div className="w-1/6 inline-block text-center time-separator">
                :
              </div>
              <CustomInputs
                class="w-5/12 mx-auto ps-1  inline-block time-input"
                label=""
                onChange={(e) =>
                  handleInputTimeChange(e, formData.meal_time, "meal_time")
                }
                inputCss="text-center"
                name="meal_min"
                value={formData.meal_time.split(":")[1]}
                placeholder=""
                type="text"
              />
            </div>
            <div className="w-1/2  mx-auto ps-1 inline-block  ">
              <label className="block" htmlFor="">
                Horas de Vacaciones{" "}
              </label>
              <CustomInputs
                class="w-5/12 mx-auto pe-1 text-center  inline-block time-input"
                label=""
                inputCss="text-center"
                name="vacations_hours"
                onChange={(e) =>
                  handleInputTimeChange(
                    e,
                    formData.vacation_time,
                    "vacation_time"
                  )
                }
                value={formData.vacation_time.split(":")[0]}
                placeholder=""
                type="text"
              />
              <div className="w-1/6 inline-block text-center time-separator">
                :
              </div>
              <CustomInputs
                class="w-5/12 mx-auto ps-1  inline-block time-input"
                label=""
                onChange={(e) =>
                  handleInputTimeChange(
                    e,
                    formData.vacation_time,
                    "vacation_time"
                  )
                }
                inputCss="text-center"
                name="vacations_min"
                value={formData.vacation_time.split(":")[1]}
                placeholder=""
                type="text"
              />
            </div>
            <div className="w-1/2  mx-auto ps-1 inline-block  ">
              <label className="block" htmlFor="">
                Horas de Enfermedad
              </label>
              <CustomInputs
                class="w-5/12 mx-auto pe-1 text-center   inline-block time-input"
                label=""
                name="sick_hours"
                inputCss="text-center"
                onChange={(e) =>
                  handleInputTimeChange(e, formData.sick_time, "sick_time")
                }
                value={formData.sick_time.split(":")[0]}
                placeholder=""
                type="text"
              />
              <div className="w-1/6 inline-block text-center time-separator">
                :
              </div>
              <CustomInputs
                class="w-5/12 mx-auto ps-1  inline-block time-input"
                label=""
                onChange={(e) =>
                  handleInputTimeChange(e, formData.sick_time, "sick_time")
                }
                inputCss="text-center"
                name="sick_min"
                value={formData.sick_time.split(":")[1]}
                placeholder=""
                type="text"
              />
            </div>
            <div className="w-1/2  mx-auto ps-1 inline-block  ">
              <label className="block" htmlFor="">
                Horas de Feriados
              </label>
              <CustomInputs
                class="w-5/12 mx-auto pe-1 text-center   inline-block time-input"
                label=""
                name="holiday_hours"
                inputCss="text-center"
                onChange={(e) =>
                  handleInputTimeChange(
                    e,
                    formData.holiday_time,
                    "holiday_time"
                  )
                }
                value={formData.holiday_time.split(":")[0]}
                placeholder=""
                type="text"
              />
              <div className="w-1/6 inline-block text-center time-separator">
                :
              </div>
              <CustomInputs
                class="w-5/12 mx-auto ps-1  inline-block time-input"
                label=""
                onChange={(e) =>
                  handleInputTimeChange(
                    e,
                    formData.holiday_time,
                    "holiday_time"
                  )
                }
                inputCss="text-center"
                name="holiday_min"
                value={formData.holiday_time.split(":")[1]}
                placeholder=""
                type="text"
              />
            </div>

            <div className="xl:w-1/2 w-full  mx-auto ps-1 inline-block  ">
              <CustomInputs
                class="time-input mx-auto pe-1  inline-block "
                label="Propinas"
                inputCss="text-center"
                name="tips"
                value={formData.tips}
                onChange={handleInputChange}
                type="number"
              />
              <div className="w-1/6 inline-block text-center time-separator"></div>
              <CustomInputs
                class="time-input mx-auto ps-1   inline-block "
                label="Comisiones"
                name="commissions"
                inputCss="text-center"
                value={formData.commissions}
                onChange={handleInputChange}
                type="number"
              />
            </div>

            <div className="xl:w-1/2 w-full  mx-auto ps-1 inline-block  ">
              <CustomInputs
                class="time-input mx-auto   inline-block "
                label="Concesiones"
                name="concessions"
                inputCss="text-center"
                value={formData.concessions}
                onChange={handleInputChange}
                type="number"
              />
              <div className="w-1/6 inline-block text-center time-separator"></div>
              <CustomInputs
                class="time-input mx-auto ps-1   inline-block "
                label="Salario"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                inputCss="text-center"
                type="number"
              />
            </div>
            <div className="xl:w-1/2 w-full  mx-auto ps-1 inline-block  ">
              <CustomInputs
                class="time-input mx-auto   inline-block "
                label="Bono"
                name="bonus"
                value={formData.bonus}
                inputCss="text-center"
                onChange={handleInputChange}
                type="number"
              />
              <div className="w-1/6 inline-block text-center time-separator"></div>
              <CustomInputs
                class="time-input mx-auto ps-1  inline-block "
                label="Others"
                onChange={handleInputChange}
                value={formData.others}
                name="others"
                inputCss="text-center"
                type="number"
              />
            </div>
            <div className="w-full mx-auto ps-1 inline-block  ">
              <CustomInputs
                class=" w-full mx-auto   inline-block "
                label="Memo"
                name="memo"
                value={formData.memo}
                onChange={handleInputChange}
                type="textarea"
              />
            </div>
          </div>

          <div className="xl:w-1/3 w-full border rounded-lg border-gray-500 p-2 ">
            <h2 className="mt-2 text-center text-2xl">Montos</h2>
            <hr className="mt-2 mb-4" />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="REG. PAY"
              inputCss="text-center"
              disabled={true}
              name="regular_pay"
              value={getNumber(formData.regular_pay)}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="OVER TIME"
              disabled={true}
              inputCss="text-center"
              name="overtime_pay"
              value={getNumber(formData.overtime_pay)}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="MEAL TIME"
              disabled={true}
              inputCss="text-center"
              name="meal_time_pay"
              value={getNumber(formData.meal_time_pay)}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="VACATION"
              disabled={true}
              inputCss="text-center"
              name="vacation_pay"
              value={getNumber(formData.vacation_pay)}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/3 mx-auto mb-4 pe-1  inline-block "
              label="SICK PAY"
              disabled={true}
              inputCss="text-center"
              value={getNumber(formData.sick_pay)}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/3 mx-auto mb-4 pe-1  inline-block "
              label="HOLYDAY PAY"
              disabled={true}
              inputCss="text-center"
              value={getNumber(formData.holyday_pay)}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/3 mx-auto mb-4 pe-1  inline-block "
              label="Propinas"
              disabled={true}
              inputCss="text-center"
              value={getNumber(formData.tips)}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/3 mx-auto mb-4 pe-1  inline-block "
              label="Comisiones"
              disabled={true}
              inputCss="text-center"
              value={getNumber(formData.commissions)}
              placeholder=""
              type="number"
            />
            <CustomInputs
              class="w-1/3 mx-auto mb-4 pe-1  inline-block "
              label="Concesiones"
              disabled={true}
              inputCss="text-center"
              value={getNumber(formData.concessions)}
              placeholder=""
              type="number"
            />
            <div className="xl:w-full w-full text-end ">
              <CustomInputs
                class="w-1/3 mx-auto pe-1  inline-block text-center "
                label="Total"
                disabled={true}
                inputCss="text-center border-0"
                value={getNumber(getPreTotal())}
                placeholder=""
                type="number"
              />
            </div>
          </div>

          <div className="xl:w-1/3 w-full border rounded-lg border-gray-500 p-2 ">
            <>
              <h2 className="mt-2 text-center text-2xl">Taxes</h2>
              <hr className="mt-2 mb-4" />
            </>
            <div
              className={` block mb-2   font-medium text-gray-700 w-1/2 mx-auto pe-1  inline-block `}
            >
              <label>
                <span>
                  {" "}
                  Incapacidad
                  <span>( - )</span>
                </span>

                <input
                  className={` bg-gray-50 text-sm text-center invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
                  tabIndex={0}
                  type="number"
                  name="inability"
                  value={getNumber(formData.inability)}
                />
              </label>
            </div>
            <div
              className={` block mb-2   font-medium text-gray-700 w-1/2 mx-auto pe-1  inline-block `}
            >
              <label>
                <span>
                  {" "}
                  MEDICARE
                  <span>( - )</span>
                </span>

                <input
                  className={` bg-gray-50 text-sm text-center invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
                  tabIndex={0}
                  type="number"
                  name="medicare"
                  value={getNumber(formData.medicare)}
                />
              </label>
            </div>
            <div
              className={` block mb-2   font-medium text-gray-700 w-1/2 mx-auto pe-1  inline-block `}
            >
              <label>
                <span>
                  {" "}
                  Seguro Social
                  <span>( - )</span>
                </span>

                <input
                  className={` bg-gray-50 text-sm text-center invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
                  tabIndex={0}
                  type="number"
                  name="secure_social"
                  value={getNumber(formData.secure_social)}
                />
              </label>
            </div>
            <div
              className={` block mb-2   font-medium text-gray-700 w-1/2 mx-auto pe-1  inline-block `}
            >
              <label>
                <span>
                  {" "}
                  Seg Social Propinas
                  <span>( - )</span>
                </span>

                <input
                  className={` bg-gray-50 text-sm text-center invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
                  tabIndex={0}
                  type="number"
                  name="social_tips"
                  value={getNumber(formData.social_tips)}
                />
              </label>
            </div>
            <div
              className={` block mb-2   font-medium text-gray-700 w-1/2 mx-auto pe-1  inline-block `}
            >
              <label>
                <span>
                  {" "}
                  Tax Retenido PR
                  <span>( - )</span>
                </span>

                <input
                  className={` bg-gray-50 text-sm text-center invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
                  tabIndex={0}
                  type="number"
                  name="tax_pr"
                  onChange={handleInputChange}
                  value={getNumber(formData.tax_pr)}
                />
              </label>
            </div>
            <div
              className={` block mb-2   font-medium text-gray-700 w-1/2 mx-auto pe-1  inline-block `}
            >
              <label>
                <span>
                  {" "}
                  Choferil
                  <span>( - )</span>
                </span>

                <input
                  className={` bg-gray-50 text-sm text-center invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
                  type="number"
                  name="choferil"
                  value={getNumber(formData.choferil)}
                />
              </label>
            </div>
            <div
              className={` block mb-2   font-medium text-gray-700 w-1/2 mx-auto pe-1  inline-block `}
            >
              <label>
                <span>
                  {" "}
                  Donativo
                  <span>( - )</span>
                </span>

                <input
                  className={` bg-gray-50 text-sm text-center invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
                  type="number"
                  onChange={handleInputChange}
                  name="donation"
                  value={getNumber(formData.donation)}
                />
              </label>
            </div>
            <div
              className={` block mb-2   font-medium text-gray-700 w-1/2 mx-auto pe-1  inline-block `}
            >
              <label>
                <span>
                  {" "}
                  Gastos Reembolsados
                  <span>( + )</span>
                </span>

                <input
                  className={` bg-gray-50 text-sm text-center invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
                  type="number"
                  onChange={handleInputChange}
                  name="refund"
                  value={getNumber(formData.refund)}
                />
              </label>
            </div>
            <div
              className={` block mb-2   font-medium text-gray-700 w-1/2 mx-auto pe-1  inline-block `}
            >
              <label>
                <span>
                  {" "}
                  ASUME
                  <span>( - )</span>
                </span>

                <input
                  className={` bg-gray-50 text-sm text-center invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
                  type="number"
                  onChange={handleInputChange}
                  name="asume"
                  value={getNumber(formData.asume)}
                />
              </label>
            </div>
            <div
              className={` block mb-2   font-medium text-gray-700 w-1/2 mx-auto pe-1  inline-block `}
            >
              <label>
                <span>
                  {" "}
                  AFLAC
                  <span>( - )</span>
                </span>

                <input
                  className={` bg-gray-50 text-sm text-center invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
                  type="number"
                  onChange={handleInputChange}
                  name="aflac"
                  value={getNumber(formData.aflac)}
                />
              </label>
            </div>
            <div
              className={` block mb-2   font-medium text-gray-700 w-1/2 mx-auto pe-1  inline-block `}
            >
              <label>
                <span>
                  {" "}
                  Plan Medico
                  <span>( - )</span>
                </span>

                <input
                  className={` bg-gray-50 text-sm text-center invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
                  type="number"
                  onChange={handleInputChange}
                  name="medical_insurance"
                  value={getNumber(formData.medical_insurance)}
                />
              </label>
            </div>
            {formData.id == 0 && (
              <>
                {taxesData.map((item, index: number) => (
                  <div
                    key={index}
                    className={` block mb-2   font-medium text-gray-700 w-1/2 mx-auto pe-1  inline-block `}
                  >
                    <label>
                      {item.required === 1 && (
                        <>
                          <input
                            type="checkbox"
                            checked={item.is_active}
                            onChange={(e) => handleCheck(e, item)}
                          />
                        </>
                      )}
                      <span>
                        {" "}
                        {item.name}{" "}
                        {item.type_taxe != 1 ? (
                          <span>( + )</span>
                        ) : (
                          <span>( - )</span>
                        )}
                      </span>

                      <input
                        className={` bg-gray-50 text-sm text-center invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
                        tabIndex={0}
                        type="number"
                        onChange={(e) => handleitem(e, item)}
                        name={item.name}
                        value={getAmountTaxe2(item)}
                      />
                    </label>
                  </div>
                ))}
              </>
            )}
            {formData.id != 0 && (
              <>
                {formData.payment.map((item: any, index: number) => (
                  <div
                    key={index}
                    className={` block mb-2   font-medium text-gray-700 w-1/2 mx-auto pe-1  inline-block `}
                  >
                    <label>
                      {item.required === 1 && (
                        <>
                          <input
                            type="checkbox"
                            onChange={(e) => handleCheck(e, item)}
                            checked={item.is_active}
                          />
                        </>
                      )}
                      <span>
                        {" "}
                        {item.name}{" "}
                        {item.type_taxe != 1 ? (
                          <span>( + )</span>
                        ) : (
                          <span>( - )</span>
                        )}
                      </span>

                      <input
                        className={` bg-gray-50 text-sm text-center invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
                        tabIndex={0}
                        type="number"
                        onChange={(e) => handleitem(e, item)}
                        name={item.name}
                        value={getAmountTaxe(item)}
                      />
                    </label>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        <div className="xl:w-full w-full text-end mt-4 ">
          <CustomInputs
            class="w-1/2 xl:w-1/6 mx-auto pe-1  inline-block text-center "
            label="Total"
            inputCss="text-center border-0"
            disabled={true}
            value={getNumber(getTotal())}
            placeholder=""
            type="number"
          />
        </div>
        <div className="w-full text-end">
          {formData.id != 0 && (
            <button
              onClick={handleModal2}
              className="w-auto mt-4  me-4 mx-auto bg-[#333160] py-4 text-black bg-red-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 text-center "
            >
              Eliminar
            </button>
          )}
          {formData.id != 0 && (
            <button
              onClick={() => recalculate()}
              className="w-auto mt-4  mx-auto bg-[#333160] py-4 text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 text-center "
            >
              Recalcular
            </button>
          )}

          {formData.id != 0 && (
            <button
              type="button"
              onClick={generateFile}
              className="w-auto mt-4 mx-auto ml-4 bg-[#333160] py-4 text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 text-center "
            >
              Descargando Talonario
            </button>
          )}
          <button
            onClick={handleModal}
            className="w-auto mt-4 ms-4 mx-auto bg-[#333160] py-4 text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 text-center "
          >
            Cargar tiempo de empleado
          </button>
        </div>
      </div>
      <ModalAlert
        isOpen={isOpen2}
        action={handleDelete}
        show={loanding}
        setIsOpen={handleModal2}
        title={`Eliminar`}
        description={`¿Esta seguro que desea ELIMINAR
         el periodo seleccionado?`}
      />
      <ModalAlert
        isOpen={isOpen}
        show={loanding}
        action={handleCreate}
        setIsOpen={handleModal}
        title={`Cargar Hora`}
        description={message}
      />
    </>
  );
};

export default Cargar;
