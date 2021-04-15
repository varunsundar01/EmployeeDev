export default function useTimeDifference(storedTime) {
    //Get time difference between the last time projects was stored in localstorage and now
    const lastProjectsTime = new Date(storedTime).getTime(); //in milliseconds
    const timeDifference = (new Date().getTime() - lastProjectsTime) / 1000;

    return timeDifference;
}