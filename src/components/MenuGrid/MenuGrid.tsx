'use client';

import React, { useState } from "react";
import Link from "next/link";
import Modal from "../Modal/Modal";
import ContainerWrap from "../Wrap/Wrap";
import DocumentsModalContent from "../DocumentsModalContent/DocumentsModalContent";
import ProcurementsModalContent from "../ProcurementModalContent/ProcurementModalContent";
import JournalsModalContent from "../JournalsModalContent/JournalsModalContent";
import styles from "./MenuGrid.module.css";

import { InstituteDocument } from "@/types/documents";
import { Procurement } from "@/types/procurements";
import { Journal } from "@/types/journals";

type Locale = "uk" | "en";
type ModalType = "documents" | "procurement" | "journals" | null;

type Props = {
  documents: InstituteDocument[];
  procurements: Procurement[];
  journals: Journal[];
  locale: Locale;
  t: any;
};

const items: {
    id: string;
    key: string;
    labelKey: string;// ключ з submenu
    action: "modal" | "link";
    href?: string;
  }[] = [
    { id: "docs", key: "documents", labelKey: "docs", action: "modal" },
    { id: "icon-international", key: "intprojects", labelKey: "intProjects", action: "link", href: "/intactivity/intprojects" },
    { id: "icon-publications", key: "journals", labelKey: "journals", action: "modal" },
    { id: "icon-council", key: "council", labelKey: "scientificCouncil", action: "link", href: "/institute/council" },
    { id: "icon-departments", key: "structure", labelKey: "departments", action: "link", href: "/institute/structure" },
    { id: "icon-proc", key: "procurement", labelKey: "procurements", action: "modal" },
  ];

const MenuGrid: React.FC<Props> = ({ documents, procurements, journals, locale, t }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const renderModalContent = () => {
    switch (activeModal) {
      case "documents":
        return <DocumentsModalContent docs={documents} locale={locale} />;
      case "procurement":
        return <ProcurementsModalContent procurements={procurements} locale={locale} />;
      case "journals":
        return <JournalsModalContent journals={journals} locale={locale} />;
      default:
        return null;
    }
  };

  return (
    <section className={styles.container}>
         <ContainerWrap>
      <div className={styles.grid}>
      {items.map((item) =>
  item.action === "modal" ? (
    <button
      key={item.key}
      className={styles.card}
      onClick={() => setActiveModal(item.key as ModalType)}
    >
      <svg className={styles.icon}>
        <use href={`/spriteNew.svg#${item.id}`} />
      </svg>
      <span className={styles.label}>{t.submenu[item.labelKey]}</span>
    </button>
  ) : (
    <Link key={item.key} href={`/${locale}${item.href!}`} className={styles.card}>
    <svg className={styles.icon}>
      <use href={`/spriteNew.svg#${item.id}`} />
    </svg>
    <span className={styles.label}>{t.submenu[item.labelKey]}</span>
  </Link>
  )
)}
      </div>

      {activeModal && renderModalContent() && (
        <Modal onClose={() => setActiveModal(null)}>
          {renderModalContent()}
        </Modal>
      )}
      </ContainerWrap>
    </section>
  );
};

export default MenuGrid;
