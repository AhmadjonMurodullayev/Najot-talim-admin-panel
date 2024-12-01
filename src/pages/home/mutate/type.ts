export interface getDataType {
  data: {
    contracts: {
      id: number;
      title: string;
      createdAt: number;
      attachment: {
        origName: string;
        size: number;
        url: string;
      };
    }[];
  };
}

export interface dataType {
  data: {
    fileName: string;
    path: string;
    size: number;
  }[];
  error: null;
  success: boolean;
}

export interface CreateCourseType {
  title?: string;
  courseId: number;
  attachment: {
    size?: number;
    url?: string;
    origName?: string;
  };
}

export interface DataTypes {
  [x: string]: any;
  title: string;
  courseId: number;
  attachment: {
    size: number;
    url: string;
    origName: string;
  };
}

export type FieldType = {
  login?: string;
  password?: string;
  title?: string;
  courseId?: number;
  files?: string;
  course?: string;
};

export interface Course {
  id: number;
  name: string;
  createdAt: Date;
}

export interface Contract {
  id: number;
  course: Course;
  title: string;
  attachment: Attachment;
  createdAt: string;
}
export interface Attachment {
  url: string;
  origName: string;
  size: number;
}
export interface GetDataTypes {
  attachment: any;
  data: Data;
  error: null;
  success: boolean;
  id: number;
}
export interface Data {
  [x: string]: any;
  contracts: Contract[];
  total: number;
  courses: Course[];
}
