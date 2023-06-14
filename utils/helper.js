const tipoToString = (tipo) => {
  switch (tipo) {
    case "discoteca":
      return "Discoteca";
    case "sala":
      return "Sala de Fiestas";
    case "bar":
      return "Bar de Copas";
    default:
      throw "Error en tipo to string";
  }
};

export default {
  tipoToString,
};
