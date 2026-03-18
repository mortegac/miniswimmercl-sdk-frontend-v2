


const calculateCurrentDate = () => {

    // const date = new Date();
    const date = new Date(Date.now()).toString();
    const year = new Date(Date.now()).getFullYear();
    const month = new Date(Date.now()).getMonth() + 1;
    const day = new Date(Date.now()).getDate().toString();
    const hour = new Date(Date.now()).getHours();
    const minutes = new Date(Date.now()).getMinutes();

    return {
        now: date,
        day: day < 10 ? '0' + day?.toString() : day?.toString(),
        month: month < 10 ? '0' + month?.toString() : month?.toString(),
        year: year?.toString(),
        hourFull: `${hour < 10 ? '0' + hour : hour}:${minutes < 10 ? '0' + minutes : minutes}`,
        hour: hour < 10 ? '0' + hour : hour,
        minutes: minutes < 10 ? '0' + minutes : minutes,
    }
}

const calculateTime = (start, end) => {
    const auxStart = start.split(":");
    const auxEnd = end.split(":");
    const startTime = parseInt(`${auxStart[0]}${auxStart[1]}`);
    const endTime = parseInt(`${auxEnd[0]}${auxEnd[1]}`);
    const startDate = new Date(0, 0, 0, auxStart[0], auxStart[1], 0);
    const endDate =
        endTime > startTime
            ? new Date(0, 0, 0, auxEnd[0], auxEnd[1], 0)
            : endTime === startTime
                ? new Date(0, 0, 0, auxEnd[0], auxEnd[1], 30)
                : new Date(0, 0, 1, auxEnd[0], auxEnd[1], 0);
    return Math.abs(startDate - endDate) / 1000 / 60;
};

const timeFormater = (dateString) => {
    const time = new Date(dateString);
    const hours =
        parseInt(time.getHours()) < 10
            ? `0${parseInt(time.getHours())}`
            : `${parseInt(time.getHours())}`;
    const minutes =
        parseInt(time.getMinutes()) < 10
            ? `0${parseInt(time.getMinutes())}`
            : `${parseInt(time.getMinutes())}`;
    return `${hours}:${minutes}`;
};


module.exports = {
    calculateCurrentDate,
    calculateTime,
    timeFormater
};