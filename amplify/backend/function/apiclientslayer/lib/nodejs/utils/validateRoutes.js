const api = require("../api/index")
const ENVIROMENT = process.env.ENV;



const fetchParameters = async () => {
    try {
        const response = await api.getParametersEnc({
            env: ENVIROMENT,
            variables: {
                id: "PROCESSCREATIONDATA",
            },
            access: {
                apikey: process.env.API_GRETABACKENDTS_GRAPHQLAPIKEYOUTPUT,
                endpoint: process.env.API_GRETABACKENDTS_GRAPHQLAPIENDPOINTOUTPUT,
            },
        })

        const cleaned = response.data.getParametersEnc.typeOfParameter.items.reduce((acc, prev) => {
            return { ...acc, [prev.id]: prev.value };
        }, {});

        return cleaned
    } catch (error) {
        console.error(error)
        throw new Error(">>>>> ERROR FETCHING PARAMETERS")
    }
}

let vehicles

(async () => {
    vehicles = JSON.parse((await fetchParameters())["VehicleSizeDown"])
})()

const validateRoutes = async ({
    correlative,
    routeName,
    productionPlant,
    comune,
    shift,
    operator,
    patent,
    typeOfVehicle,
    age,
    capacity,
    maxOcupation,
    routesPerDay,
    kmPerRoute,
    daysPerWeek,
    route,
    ...rest
}) => {
    console.log("validating ", correlative)
    const errors = []
    let target = ""
    if (rest.id !== undefined) {
        target = rest.id
    }

    if (correlative === 0) {
        errors.push({
            target: target,
            severity: "low",
            code: "01",
            type: "validation"
        })
    }

    if (routeName === "desconocido" || routeName === "") {
        errors.push(
            {
                target: target,
                severity: "low",
                code: "02",
                type: "validation"
            }
        )
    }

    if (productionPlant === "desconocido" || productionPlant === "") {
        errors.push({
            target: target,
            severity: "low",
            code: "03",
            type: "validation"
        })
    }

    if (comune === "desconocido" || comune === "") {
        errors.push({
            target: target,
            severity: "low",
            code: "04",
            type: "validation"
        })
    }

    if (shift === "desconocido" || shift === "") {
        errors.push({
            target: target,
            severity: "low",
            code: "05",
            type: "validation"
        })
    }

    if (operator === "desconocido" || operator === "") {
        errors.push({
            target: target,
            severity: "low",
            code: "06",
            type: "validation"
        })
    }

    if (patent === "desconocido" || patent === "") {
        errors.push({
            target: target,
            severity: "low",
            code: "07",
            type: "validation"
        })
    }

    if (typeOfVehicle === "desconocido" || typeOfVehicle === "") {
        errors.push({
            target: target,
            severity: "high",
            code: "08",
            type: "validation"
        })
    }

    if (age === 0) {
        errors.push({
            target: target,
            severity: "low",
            code: "09",
            type: "validation"
        })
    }

    if (capacity === 0) {
        errors.push({
            target: target,
            severity: "high",
            code: "10",
            type: "validation"
        })
    }

    if (maxOcupation === 0) {
        errors.push({
            target: target,
            severity: "high",
            code: "11",
            type: "validation"
        })
    }

    if (routesPerDay === 0) {
        errors.push({
            target: target,
            severity: "low",
            code: "12",
            type: "validation"
        })
    }

    if (kmPerRoute === 0) {
        errors.push({
            target: target,
            severity: "high",
            code: "13",
            type: "validation"
        })
    }

    if (daysPerWeek === "desconocido" || daysPerWeek === "") {
        errors.push({
            target: target,
            severity: "high",
            code: "15",
            type: "validation"
        })
    }

    if (route.length == 0) {
        errors.push({
            target: target,
            severity: "high",
            code: "16",
            type: "validation"
        })
    }

    if (!vehicles?.includes(typeOfVehicle)) {
        errors.push({
            target: target,
            severity: "high",
            code: "17",
            detail: typeOfVehicle,
            type: "validation"
        })
    }

    if (!["Lu-Sa", "Lu-Vi", "Lu-Do"].includes(daysPerWeek)) {
        errors.push({
            target: target,
            severity: "high",
            code: "14",
            detail: daysPerWeek,
            type: "validation"
        })
    }

    return errors
}

module.exports = { validateRoutes }