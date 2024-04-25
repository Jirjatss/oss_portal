"use client";
import ReactHtmlParser from "react-html-parser";
import { useState } from "react";
import { OSSIcons } from "../../../../public/assets/icons/parent";
import FormFaq from "../Form/FormFaq";
import useLanguage from "@/app/useLanguage";
import ModalSuccess from "../Modal/ModalSuccess";
import { useRouter } from "next/navigation";

function Faq() {
  const questions = [
    {
      question: "Prosesu baibain ba aplikasaun governu nian halo nusaa? ",
      answer:
        "Tempu prosesu normál ba ita-nia aplikasaun sei la liu semana ida, maibé depende ba tipu servisu ne'ebé ita-boot sira aplika ba. Ita-boot nia aplikasaun sei akompaña husi ofisiál ida no ita-boot sei hetan  komentáriu ou feedback ruma atu halo tuir hodi bele halo susesu ita nia prosesu aplikasaun.",
    },
    {
      question:
        "Dokumentu ida-ne'ebé mak obrigatóriu ba aplikante governu nian?",
      answer:
        "Kualkér dokumentu legál ne'ebé fó sai husi entidade governu nian sei obrigatóriu ba aplikante ida, hanesan: Bilhete-identidade, Sertidaun Moris RDTL, Deklarasaun Suku, Deklarasaun hosi Polísia, Kartaun Eleitoral, etc. Maibé, dokumentu sira ne'ebé presiza sei bazeia ba tipu servisu ne'ebé ita hili ona.",
    },
    {
      question:
        "Oinsá mak aplikante sira bele halo monitorizasaun ba sira-nia submisaun nia estatutu? ",
      answer:
        "Aplikante sira bele halo monitorizasaun ba sira-nia submisaun nia estatutu liuhusi tama ba sistema no haree sira-nia submisaun ka pedidu nia estatutu. ",
    },
    {
      question: "Bele rekuza submisaun ba aplikasaun? ",
      answer: ReactHtmlParser(`
        <div>
          <p>Sin, bele rekuza submisaun ba aplikasaun: </p>
          <ul class="list-disc pl-4 mt-1">
            <li>Se Ita-nia dokumentu sira la kompletu. </li>
            <li>Se Ita nunka halo tuir ka konfirma fali ba ofisiál ida nian pergunta sira.</li>
            <li>Se iha problema tékniku ruma ne'ebé halo susar atu kompleta orden ne'e.</li>
          </ul>
          <p>Iha kazu hirak-ne'e, ita sei hetan informasaun liuhosi e-mail kona-ba rekomendasaun sira no pasu sira tuir mai atu foti, ida-ne'e hodi asegura katak ita-nia pedidu tuir mai bele hetan konsiderasaun ho susesu. </p>
        </div>
      `),
    },
    {
      question: "Se ha'u iha pergunta ruma, ha'u bele ko'alia ho se? ",
      answer: ReactHtmlParser(
        `
        Favór haruka e-mail ba <span class="text-blue-700">portal.mae@gmail.com</span>  ka kontaktu <span class="text-blue-700">(+670) 333 9077</span>  entre tuku 8 dadeer to'o tuku 5 lokraik, husi Segunda to'o Sesta eseptu feriadu públiku ka deklara loron pontu toleránsia husi Governu.
        `
      ),
    },
  ];

  const [selectedIndexes, setSelectedIndexes] = useState(
    Array(questions.length).fill(false)
  );

  const toggleFaq = (index) => {
    setSelectedIndexes((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      newIndexes[index] = !newIndexes[index];
      return newIndexes;
    });
  };

  const { t } = useLanguage();
  const router = useRouter();

  return (
    <>
      <div
        className="grid lg:grid-cols-2 grid-cols-1 justify-between gap-10 lg:py-24  pt-16"
        id="contact-us"
      >
        <div>
          <h1 className="lg:text-[40px] text-[28px] font-bold capitalize text-[#363131] mb-5">
            {t("faq_title")}
          </h1>
          <div className="flex flex-col gap-7">
            {questions.map((e, idx) => (
              <div
                className="flex w-full"
                key={idx}
                onClick={() => toggleFaq(idx)}
              >
                <div
                  className={`flex flex-col w-full ${
                    selectedIndexes[idx] ? "" : "lg:h-[64px] h-[55px]"
                  } border-b border-[#DCDCDC]`}
                >
                  <div
                    className={`flex items-center justify-between gap-[15px] `}
                  >
                    <p className="lg:text-[18px] text-[14px] text-[#646464] font-semibold">
                      {t(`question_${idx + 1}`)}
                    </p>
                    {selectedIndexes[idx] ? (
                      <div className="flex lg:mr-2 mr-1">
                        <img
                          src="/assets/icons/dash.png"
                          className="lg:w-4 lg:h-4 w-3 h-3 cursor-pointer "
                        />
                      </div>
                    ) : (
                      <>
                        <div className="cursor-pointer lg:hidden">
                          <OSSIcons name="Plus" styleDiv={{ width: "20px" }} />
                        </div>
                        <div className="cursor-pointer lg:block hidden">
                          <OSSIcons name="Plus" />
                        </div>
                      </>
                    )}
                  </div>
                  <div
                    className={`rounded-md bg-white shadow-xs transition-all ease-in-out duration-500 lg:min-w-[550px] w-5/6 ${
                      selectedIndexes[idx] ? "max-h-[500px]" : "max-h-0"
                    } overflow-hidden`}
                  >
                    <div className="text-[#646464] lg:text-[16px] text-[12px] mb-5 mt-2 text-justify">
                      {typeof e.answer !== "string" ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: t(`answer_${idx + 1}`),
                          }}
                        />
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: t(`answer_${idx + 1}`),
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <FormFaq />
      </div>
      <ModalSuccess
        id="faq_success"
        title={t("dialog_data_submitted_title")}
        description={t("dialog_data_submitted_desc")}
        onClick={() => {
          router.push("/");
        }}
      />
    </>
  );
}

export default Faq;
