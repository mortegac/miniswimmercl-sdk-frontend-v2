
export function cleanPhoneNumber(phone:string) {
  // Eliminar el signo más
  let cleanPhone = phone.replace(/^\+/, '');
  
  // Eliminar espacios y caracteres no numéricos
  cleanPhone = cleanPhone.replace(/\D/g, '');
  
  // Verificar que tenga 11 dígitos
  if (cleanPhone.length === 11) {
    return {
      cleanPhone,
      message: "",
      status: true
  };
  } else {
    return {
      message: 'Número de teléfono inválido',
      status: true
  };
  }
}
