
export type Relationship = {
  id: string;
  relationType: string;
    
  
  // user: Users! @belongsTo
  // student: Student! @belongsTo
}

export const emptyRelationship: Relationship = {
  id: "",
  relationType: "",
};


export type FilterOptions  = {
  userEmail?: string;
  studentRelationshipsId?: string;
  userId?: string;
  studentId?: string;
  relation?: string;
}


