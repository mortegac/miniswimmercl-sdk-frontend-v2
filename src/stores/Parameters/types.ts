
export type Parameters = {
  id: string
  // typeOfParameter: ParametersEnc @belongsTo
  label: string
  value: string
  idParent: string
  // metadata: [Metadata] @hasMany
  
}

export const emptyParameters: Parameters = {
  id:  "",
  label:  "",
  value:  "",
  idParent: "",
};



