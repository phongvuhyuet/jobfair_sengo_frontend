import dayjs, { Dayjs } from 'dayjs'

export const Format = {
  date: 'YYYY-MM-DD',
  dateTime: 'YYYY-MM-DD hh:mm:ss A',
  dateJp: 'YYYY/MM/DD',
  month: 'YYYY-MM',
  dateTimeJp: 'YYYY/MM/DD HH:mm:ss',
  monthJp: 'YYYY/MM',
}

export const Formatter = {
  date: (date?: string | Date | Dayjs | null): string => (!date ? '' : dayjs(date).format(Format.date)),
  dateTime: (date?: string | Date | Dayjs | null): string => (!date ? '' : dayjs(date).format(Format.dateTime)),
  dateJp: (date?: string | Date | Dayjs | null): string => (!date ? '' : dayjs(date).format(Format.dateJp)),
  dateTimeJp: (date?: string | Date | Dayjs | null): string => (!date ? '' : dayjs(date).format(Format.dateTimeJp)),
}
