export interface Microbus{
    id:number;
    driveName:string;
    route:string;
    farePerSeat:number;
    seatsAvailable:number;
    ratings: {[key:string]:number}[];
}

const microbus1: Microbus = {
    id: 1,
    driveName: "Ahmed Hassan",
    route: "Nasr City -> Ramses",
    farePerSeat: 15,
    seatsAvailable: 6,
    ratings: [
        { 'Hossam': 5 },
        { 'Youssef': 4 }
    ]
};

const microbus2: Microbus = {
    id: 2,
    driveName: "Mohamed Ali",
    route: "Maadi -> Tahrir",
    farePerSeat: 20,
    seatsAvailable: 3,
    ratings: [
         { 'Omar': 3 },
        { 'Emad': 4.5 }
    ]
};

const microbus3: Microbus = {
    id: 3,
    driveName: "Omar Samir",
    route: "Heliopolis -> Dokki",
    farePerSeat: 18,
    seatsAvailable: 8,
    ratings: [
         { 'Mohamed': 2 },
        { 'Mahmoud': 5 }
    ]
};

const microbus4: Microbus = {
    id: 4,
    driveName: "Youssef Adel",
    route: "Shubra -> Giza",
    farePerSeat: 12,
    seatsAvailable: 2,
    ratings: [
         { 'Nada': 2.5 },
        { 'Mariam': 3 }
    ]
};

export const fleet:Microbus[] = [microbus1 , microbus2 , microbus3 , microbus4];