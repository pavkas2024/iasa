type SubmenuKeys = 
  | "news"
  | "docs"
  | "journals"
  | "departments"
  | "projects"
  | "scientificCouncil"
  | "staff"
  | "publications"
  | "about"
  | "history"
  | "statute"
  | "structure"
  | "strInstitute"
  | "composition"
  | "decisions"
  | "intCooperation"
  | "intProjects"
  | "natProjects"
  | "directions"
  | "conferences"
  | "procurements";

  export interface Translation {
  menu: Record<string, string>;
  submenu: Record<SubmenuKeys, string>;
  adress: { build: string };
  form: {
    title: string;
    name: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    error: string;
    generalError: string;
  };
  staff: Record<string, string>;
  council: Record<string, string>;
  contacts: Record<string, string>;
  department: Record<string, string>;
  buttons: Record<string, string>;
}