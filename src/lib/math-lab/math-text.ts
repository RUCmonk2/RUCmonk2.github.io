/** Convert only the workshop's controlled algebra vocabulary, never HTML. */
export function factorLatex(value: string) {
  return value
    .replaceAll("×", "\\times ")
    .replaceAll("*", "\\cdot ")
    .replace(/\^(\d+)/g, "^{$1}");
}
export function factorStepSegments(text: string) {
  return text
    .split(/([xAB0-9()+\-×=^./*]+(?:[ ]*[xAB0-9()+\-×=^./*]+)*)/g)
    .map((value) => ({
      value:
        /[xAB0-9]/.test(value) && /^[xAB0-9()+\-×=^./* ]+$/.test(value)
          ? factorLatex(value)
          : value,
      math: /[xAB0-9]/.test(value) && /^[xAB0-9()+\-×=^./* ]+$/.test(value),
    }));
}
