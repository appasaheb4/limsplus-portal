export interface Lookup {
  documentName?: object;
  fieldName?: string;
  code?: string;
  value?: string;
  arrValue?: { value?: string | undefined; code?: string | undefined }[]
  description?: string;
}
  