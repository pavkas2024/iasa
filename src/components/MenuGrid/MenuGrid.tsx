
"use client";

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
import { Translation } from "@/types/common";

type Locale = "uk" | "en";

type ModalType = "documents" | "procurement" | "journals" | null;

type SubmenuKeys =
  | "docs"
  | "intProjects"
  | "journals"
  | "scientificCouncil"
  | "departments"
  | "procurements"
  | "ssai"
  | "ckkno";

type Props = {
  documents: InstituteDocument[];
  procurements: Procurement[];
  journal: Journal;
  locale: Locale;
  t: Translation;
};

type MenuGridItem = {
  id: string;
  key: string;
  labelKey: SubmenuKeys;
  action: "modal" | "link";
  href?: string;
};

const items: MenuGridItem[] = [
  {
    id: "docs",
    key: "documents",
    labelKey: "docs",
    action: "modal",
  },
  {
    id: "icon-international",
    key: "intprojects",
    labelKey: "intProjects",
    action: "link",
    href: "/intactivity/intprojects",
  },
  {
    id: "icon-publications",
    key: "journals",
    labelKey: "journals",
    action: "modal",
  },
  {
    id: "icon-council",
    key: "council",
    labelKey: "scientificCouncil",
    action: "link",
    href: "/institute/council",
  },
  {
    id: "icon-departments",
    key: "structure",
    labelKey: "departments",
    action: "link",
    href: "/institute/structure",
  },
  {
    id: "icon-proc",
    key: "procurement",
    labelKey: "procurements",
    action: "modal",
  },
  {
    id: "icon-ckkno",
    key: "ckkno",
    labelKey: "ckkno",
    action: "link",
    href: "/ckkno",
  },
  {
    id: "icon-ssai",
    key: "ssai",
    labelKey: "ssai",
    action: "link",
    href: "/research/ssai",
  },
];

const MenuGrid: React.FC<Props> = ({
  documents,
  procurements,
  journal,
  locale,
  t,
}) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const isModalOpen = activeModal !== null;

  const closeModal = () => setActiveModal(null);

  const getItemLabel = (labelKey: SubmenuKeys): string => {
    if (labelKey === "ckkno") {
      return t.menu.ckkno;
    }
  
    if (labelKey === "ssai") {
      return t.submenu.ssai;
    }
  
    return t.submenu[labelKey];
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case "documents":
        return (
          <DocumentsModalContent
            docs={documents}
            locale={locale}
          />
        );

      case "procurement":
        return (
          <ProcurementsModalContent
            procurements={procurements}
            locale={locale}
          />
        );

      case "journals":
        return (
          <JournalsModalContent
            journal={journal}
            locale={locale}
          />
        );

      default:
        return null;
    }
  };

  return (
    <section className={styles.container}>
      <ContainerWrap>
        <div className={styles.grid}>
          {items.map((item) => {
            const icon = (
              <svg className={styles.icon} aria-hidden="true">
                <use href={`/spriteNew.svg#${item.id}`} />
              </svg>
            );

            const label = getItemLabel(item.labelKey);

            if (item.action === "modal") {
              return (
                <button
                  key={item.key}
                  type="button"
                  className={styles.card}
                  onClick={() =>
                    setActiveModal(item.key as ModalType)
                  }
                >
                  {icon}
                  <span className={styles.label}>{label}</span>
                </button>
              );
            }

            return (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className={styles.card}
              >
                {icon}
                <span className={styles.label}>{label}</span>
              </Link>
            );
          })}
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
        >
          {renderModalContent()}
        </Modal>
      </ContainerWrap>
    </section>
  );
};

export default MenuGrid;
