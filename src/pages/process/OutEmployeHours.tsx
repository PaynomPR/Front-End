import { useEffect, useState } from "react";
import CustomInputs from "../../components/forms/CustomInputs";

import {
  deleteTime,
  editOutTime,
  getCompanyWithOutEmployerTime,
  setOutTime,
} from "../../utils/requestOptions";
import { useParams } from "react-router-dom";
import { COMPANY_DATA } from "../../models/company";

import {
  convertTimeToHoursWithDecimals,
  filterById,
  showError,
  showSuccess,
} from "../../utils/functions";

import ModalAlert from "../../components/dashboard/ModalAlert";
import { OUT_EMPLOYER_DATA } from "../../models/outEmployers";
import { FOREIGN_DATA } from "../../models/foreignHours";

const OutEmployeHours = () => {
  const params = useParams();
  const [employerData, setEmployerData] = useState(OUT_EMPLOYER_DATA);
  const [companyData, setCompanyData] = useState(COMPANY_DATA);
  const [timesData, setTimesData] = useState([FOREIGN_DATA]);
  const [formData, setFormData] = useState(FOREIGN_DATA);
  const [employers, setEmployers] = useState([]);
  const [idEmployer, setIdEmployer] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleModal2 = () => {
    setIsOpen2(!isOpen2);
  };

  const recalculate = () => {
    let total = Number(
      employerData.regular_pay *
        convertTimeToHoursWithDecimals(
          formData.regular_hours + ":" + formData.regular_min
        )
    );

    let detained = 0;
    if (total != 0) {
      const withholdingValue = employerData.withholding.replace("%", "");
      detained = total * (Number(withholdingValue) / 100);
    }
    console.log(employerData.withholding);
    setFormData({
      ...formData,

      detained: Number(detained),
      regular_pay: Number(total),
    });
  };

  useEffect(() => {
    if (formData.id == 0) {
      recalculate();
    }
  }, [formData.regular_min, formData.regular_hours]);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]:
        e.currentTarget.type === "number"
          ? parseFloat(e.currentTarget.value)
          : e.currentTarget.value,
    });
  };
  const handleInputTimeChange = (e: React.FormEvent<HTMLInputElement>) => {
    let value = 0;
    value = parseInt(e.currentTarget.value);
    if (parseInt(e.currentTarget.value) >= 60) value = 59;
    setFormData({
      ...formData,
      [e.currentTarget.name]: value + "",
    });
  };

  const handleCreate = () => {
    if (formData.id == 0) {
      setOutTime(formData, Number(params.id_employer))
        .then(() => {
          // Data retrieval and processing
          setFormData(FOREIGN_DATA);
          getData(idEmployer);
          handleModal();
          showSuccess("Creado exitosamente.");
        })
        .catch((error) => {
          // If the query fails, an error will be displayed on the terminal.
          showError(error.response.data.detail);
        });
    } else {
      editOutTime(formData, Number(formData.id))
        .then(() => {
          // Data retrieval and processing
          setFormData(FOREIGN_DATA);
          getData(idEmployer);
          handleModal();
          showSuccess("Editado exitosamente.");
        })
        .catch((error) => {
          // If the query fails, an error will be displayed on the terminal.
          showError(error.response.data.detail);
        });
    }
  };
  const handleChangeEmployer = (e: React.FormEvent<any>) => {
    const value = e.currentTarget.value;
    setIdEmployer(Number(value));
    getData(Number(value));
  };
  const handleDelete = () => {
    deleteTime(formData.id)
      .then(() => {
        // Data retrieval and processing
        setFormData(FOREIGN_DATA);
        getData(idEmployer);
        handleModal();
        showSuccess("Creado exitosamente.");
      })
      .catch((error) => {
        // If the query fails, an error will be displayed on the terminal.
        showError(error.response.data.detail);
      });
  };
  const getData = (id: number) => {
    getCompanyWithOutEmployerTime(Number(params.id), id)
      .then((response) => {
        // Data retrieval and processing
        setEmployerData(response.data.result.employer);
        setCompanyData(response.data.result.company);
        setEmployers(response.data.result.employers);
        setTimesData([]);

        if (response.data.result.time.length == 0) setTimesData([FOREIGN_DATA]);
        else {
          setTimesData([...response.data.result.time, FOREIGN_DATA]);
        }
      })
      .catch(() => {
        // If the query fails, an error will be displayed on the terminal.
      });
  };

  const handlePeriodChange = (e: React.FormEvent<any>) => {
    const value = e.currentTarget.value;

    if (timesData.length > 0 && value >= 0) {
      setFormData(filterById(timesData, value));
      console.log(formData);
    }
  };

  useEffect(() => {
    getData(Number(params.id_employer));
    setIdEmployer(Number(params.id_employer));
  }, []);

  return (
    <>
      <div className="text-[#EED102] bg-[#333160] p-6 rounded-lg text-center">
        <h3 className="text-2xl">Cargar Tiempo</h3>

        <p className="text-white mt-4">Pago Numero</p>
        <label
          className={` block mb-2 text-sm font-medium text-gray-700 w-2/6 mx-auto mt-4 inline-block`}
        >
          <select
            onChange={handlePeriodChange}
            name="period"
            value={formData.paid}
            className={` bg-gray-50 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-3`}
          >
            <option value={-1}>Seleccione una opción</option>
            {timesData.map((item: any, i: number) => (
              <option key={i} value={item.id}>
                Pago {i + 1}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="w-full  mt-4 bg-white rounded-lg shadow p-4 ">
        <div className="xl:w-full w-full ">
          <CustomInputs
            class="w-1/2 mx-auto pe-1  inline-block "
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
            className={`w-1/2 bg-gray-50 border inline-block  border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-[0.7em]`}
          >
            <option value={-1}>Seleccione una opción</option>
            {employers.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.first_name + " " + item.last_name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-row xl:flex-col gap-4">
          <div className="xl:w-full w-full ">
            <h2 className="mt-2 text-center text-2xl">Horas</h2>
            <hr className="mt-2 mb-6" />
            <div className="w-1/6 mx-auto  inline-block  ">
              <label className="block" htmlFor="">
                Horas Regulares
              </label>
              <CustomInputs
                class="w-5/12 mx-auto text-center inline-block time-input "
                label=""
                inputCss="text-center"
                name="regular_hours"
                onChange={handleInputChange}
                value={formData.regular_hours}
                placeholder=""
                type="text"
              />
              <div className="w-1/6 inline-block text-center time-separator">
                :
              </div>
              <CustomInputs
                class="w-5/12 mx-auto   inline-block time-input "
                label=""
                onChange={handleInputTimeChange}
                inputCss="text-center"
                name="regular_min"
                value={formData.regular_min}
                placeholder=""
                type="text"
              />
            </div>
            <div className="w-10/12 mx-auto  inline-block  "></div>
            <div className="w-full md:w-2/3  mx-auto  inline-block  ">
              <p className="uppercase">
                1. Pagos servicios prestados individuos no sujetos a retención
              </p>
            </div>
            <div className="w-1/3  mx-auto  inline-block  ">
              <div className="w-1/2  mx-auto  inline-block  ">
                <label className="block" htmlFor="">
                  Pago
                </label>
                <CustomInputs
                  class="w-full mx-auto pe-1  inline-block  "
                  label=""
                  inputCss="text-center"
                  name="regular_pay"
                  disabled={true}
                  value={
                    employerData.type_entity == 1 &&
                    Number(employerData.withholding.replace("%", "")) == 0
                      ? formData.regular_pay
                      : 0
                  }
                  placeholder=""
                  type="text"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3  mx-auto  inline-block  ">
              <p className="uppercase">
                2. Pagos servicios prestados CORP y sociedades no sujetos a
                retención
              </p>
            </div>
            <div className="w-1/3  mx-auto  inline-block  ">
              <div className="w-1/2  mx-auto  inline-block  ">
                <label className="block" htmlFor="">
                  Pago
                </label>
                <CustomInputs
                  class="w-full mx-auto pe-1  inline-block  "
                  label=""
                  inputCss="text-center"
                  name="regular_pay"
                  disabled={true}
                  value={
                    employerData.type_entity != 1 &&
                    Number(employerData.withholding.replace("%", "")) == 0
                      ? formData.regular_pay
                      : 0
                  }
                  placeholder=""
                  type="text"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3  mx-auto  inline-block  ">
              <p className="uppercase">
                3. Pagos servicios prestados individuos sujetos a retención
              </p>
            </div>
            <div className="w-1/3  mx-auto  inline-block  ">
              <div className="w-1/2  mx-auto  inline-block  ">
                <label className="block" htmlFor="">
                  Pago
                </label>
                <CustomInputs
                  class="w-full mx-auto pe-1  inline-block  "
                  label=""
                  inputCss="text-center"
                  name="regular_pay"
                  disabled={true}
                  value={
                    employerData.type_entity == 1 &&
                    Number(employerData.withholding.replace("%", "")) != 0
                      ? formData.regular_pay
                      : 0
                  }
                  placeholder=""
                  type="text"
                />
              </div>
              <div className="w-1/2 ps-1  mx-auto  inline-block  ">
                <label className="block" htmlFor="">
                  Retenido
                </label>
                <CustomInputs
                  class="w-full mx-auto   inline-block  "
                  label=""
                  inputCss="text-center"
                  name="detained"
                  disabled={true}
                  value={
                    employerData.type_entity == 1 &&
                    Number(employerData.withholding.replace("%", "")) != 0
                      ? formData.detained
                      : 0
                  }
                  placeholder=""
                  type="text"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3  mx-auto  inline-block  ">
              <p className="uppercase">
                4. Pagos servicios prestados CORP y sociedades sujetos a
                retención
              </p>
            </div>
            <div className="w-1/3  mx-auto  inline-block  ">
              <div className="w-1/2  mx-auto  inline-block  ">
                <label className="block" htmlFor="">
                  Pago
                </label>
                <CustomInputs
                  class="w-full mx-auto pe-1  inline-block  "
                  label=""
                  inputCss="text-center"
                  name="regular_pay"
                  disabled={true}
                  value={
                    employerData.type_entity != 1 &&
                    Number(employerData.withholding.replace("%", "")) != 0
                      ? formData.regular_pay
                      : 0
                  }
                  placeholder=""
                  type="text"
                />
              </div>
              <div className="w-1/2 ps-1  mx-auto  inline-block  ">
                <label className="block" htmlFor="">
                  Retenido
                </label>
                <CustomInputs
                  class="w-full mx-auto   inline-block  "
                  label=""
                  inputCss="text-center"
                  name="detained"
                  disabled={true}
                  value={
                    employerData.type_entity != 1 &&
                    Number(employerData.withholding.replace("%", "")) != 0
                      ? formData.detained
                      : 0
                  }
                  placeholder=""
                  type="text"
                />
              </div>
            </div>
            <div className="w-full  text-end mx-auto  inline-block  ">
              <div className="w-1/6 ms-2 mx-auto text-center  inline-block  ">
                <label className="block" htmlFor="">
                  Total
                </label>
                <CustomInputs
                  class="w-full mx-auto   inline-block  "
                  label=""
                  disabled={true}
                  inputCss="text-center"
                  name="regular_min"
                  value={formData.regular_pay - formData.detained}
                  placeholder=""
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full  mt-4 text-center  p-4 ">
        <button
          onClick={handleModal}
          className="w-auto   mx-auto bg-[#333160] py-4 text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 text-center "
        >
          Cargar tiempo de empleado
        </button>
      </div>

      <ModalAlert
        isOpen={isOpen2}
        action={handleDelete}
        setIsOpen={handleModal2}
        title={`Eliminar`}
        description={`¿Esta seguro que desea ELIMINAR
         el periodo:?`}
      />
      <ModalAlert
        isOpen={isOpen}
        action={handleCreate}
        setIsOpen={handleModal}
        title={`Cargar Hora`}
        description={`¿Esta seguro que desea cargar esta data por un monto de ${
          formData.regular_pay - formData.detained
        }?`}
      />
    </>
  );
};

export default OutEmployeHours;
