export const FIREBASE_URL = 'https://meetups-1e8b0-default-rtdb.firebaseio.com/events.json';

export async function getAllEvents() {
    let allEvents = [];

    const response = await fetch(FIREBASE_URL);
    const data = await response.json();

    for (const key in data) {
        const event = {
            id: key,
            ...data[key]
        };
        allEvents.push(event);
    }

    return allEvents;
}

export function getYearsFromEvents(allEvents) {
    let yearsDuplicated = allEvents.map(event => {
        const d = new Date(event.date);
        return d.getFullYear()
    });

    yearsDuplicated.sort();

    return Array.from(new Set(yearsDuplicated));
}

export async function getYears() {
    const allEvents = await getAllEvents();

    let yearsDuplicated = allEvents.map(event => {
        const d = new Date(event.date);
        return d.getFullYear()
    });

    yearsDuplicated.sort();

    return Array.from(new Set(yearsDuplicated));
}

export async function getFeaturedEvents() {
    const allEvents = await getAllEvents();

    return allEvents.filter(event => event.isFeatured === true);
}

export async function getFeaturedEventsPath() {
    const featuredEvents = await getFeaturedEvents();

    return featuredEvents.map(event => {
        return {
            params: { id: event.id }
        }
    })
}

export async function getEventById(id) {
    const allEvents = await getAllEvents();

    return allEvents.find(event => event.id === id);
}

export async function getFilteredEvents(year, month) {
    const allEvents = await getAllEvents();

    let filteredEvents = allEvents.filter((event) => {
        const d = new Date(event.date);

        if (month === 'all') return d.getFullYear() == year;

        return d.getFullYear() == year && d.getMonth() == month - 1;
    });

    return filteredEvents;
}

export function getFilteredEventsSync(allEvents, year, month) {
    let filteredEvents = allEvents.filter((event) => {
        const d = new Date(event.date);

        if (month === 'all') return d.getFullYear() == year;

        return d.getFullYear() == year && d.getMonth() == month - 1;
    });

    return filteredEvents;
}