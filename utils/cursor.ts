export const saveCursorPosition = (element: any) => {
    const selection = window.getSelection();
    if (!selection!.rangeCount) {
      return null; // Si no hay selección activa, no hacemos nada
    }
    const range = selection!.getRangeAt(0);
    // Asegúrate de que el rango pertenece al elemento dado
    if (!element.contains(range.startContainer)) {
      return null; // El rango no pertenece al elemento
    }
  
    const offset = range.startOffset;
    return { container: range.startContainer, offset }; // Guardamos también el contenedor
  };
  
export const restoreCursorPosition = (element: any, savedPosition: any) => {
    const range = document.createRange();
    const selection = window.getSelection();
    try {
      range.setStart(element.firstChild || element, savedPosition.offset);
      range.collapse(true);
      selection!.removeAllRanges();
      selection!.addRange(range);
    } catch(e) {
      console.error("Fallo en cursor")
    }
  };