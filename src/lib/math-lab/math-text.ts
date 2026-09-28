/** Convert only the workshop's controlled algebra vocabulary, never HTML. */
export function factorLatex(value: string) {
  return value
    .replace(/(?:sqrt\((\d+)\)|√(\d+))/g, (_, a, b) => `\\sqrt{${a ?? b}}`)
    .replaceAll("×", "\\times ")
    .replaceAll("*", "\\cdot ")
    .replace(/\^(\d+)/g, "^{$1}");
}
export function factorStepSegments(text: string) {
  return text
    .replace(/sqrt\((\d+)\)/g, "√$1")
    .split(/([xyzabctAB√0-9()+\-×=^./*]+(?:[ ]*[xyzabctAB√0-9()+\-×=^./*]+)*)/g)
    .map((value) => ({
      value:
        /[xyzabctAB0-9]/.test(value) &&
        /^[xyzabctAB√0-9()+\-×=^./* ]+$/.test(value)
          ? factorLatex(value)
          : value,
      math:
        /[xyzabctAB0-9]/.test(value) &&
        /^[xyzabctAB√0-9()+\-×=^./* ]+$/.test(value),
    }));
}
