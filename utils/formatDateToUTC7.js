import moment from "moment-timezone";

const formatDateToUTC7 = (date) => {
    const dateTimeWIB = moment(date).tz("Asia/Jakarta");
    const formattedDateTime = dateTimeWIB.format("YYYY-MM-DD HH:mm:ss");
    return formattedDateTime;
}

export default formatDateToUTC7;