export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {}
}
export const VaccinationFormErrorMessages = [
  new ErrorMessage(
    'max_participants',
    'required',
    'Es muss eine maximale Anzahl der Teilnehmer*innen angegeben werden'
  ),
  new ErrorMessage(
    'max_participants',
    'min',
    'Die Anzahl der Teilnehmer*innen muss positiv sein'
  ),
  new ErrorMessage('date', 'required', 'Es muss ein Datum angegeben werden'),
  new ErrorMessage('time', 'required', 'Es muss eine Zeit angegeben werden'),
  new ErrorMessage(
    'location',
    'required',
    'Es muss ein Ort für die Impfung ausgewählt werden'
  )
];
