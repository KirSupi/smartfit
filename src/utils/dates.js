import {format, parseISO} from "date-fns";

export const parseDatetime = raw => parseISO(raw);
export const beautifyDatetime = raw => format(parseDatetime(raw), 'YYYY-MM-dd HH:mm:ss')