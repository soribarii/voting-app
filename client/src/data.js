import Thumbnail1 from './assets/flag1.png'
import Thumbnail2 from './assets/flag2.webp'
import Thumbnail3 from './assets/flag3.webp'
import Candidatel from './assets/candidate1.jpg' 
import Candidate2 from './assets/candidate2.jpg' 
import Candidate3 from './assets/candidate3.jpg' 
import Candidate4 from './assets/candidate4.jpg' 
import Candidate5 from './assets/candidate5.jpg' 
import Candidate6 from './assets/candidate6.jpg' 
import Candidate7 from './assets/candidate7.jpg'

export const elections = [
    {
        id: "e1",
        title: "Student Presidential Elections 2024",
        description: `Provident similique accusantium nemo autem. Veritatisobcaecati tenetur iure 
        eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! 
        Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid.`,
        thumbnail: Thumbnail1,
        candidates: ["c1", "c2", "c3", "c4"],
        voters: []
    },
    {
        id: "e2",
        title: "Student vice Presidential Elections 2024",
        description: `Provident similique accusantium nemo autem. Veritatisobcaecati tenetur iure eius earum 
        ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, 
        odit, tenetur error, harum nesciunt ipsum debitis quas aliquid.`,
        thumbnail: Thumbnail2,
        candidates: ["c5", "c6", "c7"],
        voters: []
    },
    {
        id: "e3",
        title: "Room Presidential Elections 2024",
        description: `Provident similique accusantium nemo autem. Veritatisobcaecati tenetur iure eius earum ut 
        molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, 
        odit, tenetur error, harum nesciunt ipsum debitis quas aliquid.`,
        thumbnail: Thumbnail3,
        candidates: [],
        voters: []
    },
]

export const candidates = [
    {
        id: "c1",
        fullName: "Gojo satoru",
        image: Candidatel,
        motto: `Sed quibusdam recusandae alias error harum maxime adipisci amet laborum.`,
        voteCount: 23,
        election: "e1",
    },
    {
        id: "c2",
        fullName: "Ryomen Sukuna",
        image: Candidate2,
        motto: `Sed quibusdam recusandae alias error harum maxime adipisci amet laborum.`,
        voteCount: 18,
        election: "e1",
    },    
    {
        id: "c3",
        fullName: "Yuta Okkotsu",
        image: Candidate3,
        motto: `Sed quibusdam recusandae alias error harum maxime adipisci amet laborum.`,
        voteCount: 3,
        election: "e2",
    },    
    {
        id: "c4",
        fullName: "Megumi Fushiguro",
        image: Candidate4,
        motto: `Sed quibusdam recusandae alias error harum maxime adipisci amet laborum.`,
        voteCount: 5,
        election: "e1",
    },
    {
        id: "c5",
        fullName: "hoshi Ganyo",
        image: Candidate5,
        motto: `Sed quibusdam recusandae alias error harum maxime adipisci amet laborum.`,
        voteCount: 238,
        election: "e2",
    },
    {
        id: "c6",
        fullName: "Gochi Ganyo",
        image: Candidate6,
        motto: `Sed quibusdam recusandae alias error harum maxime adipisci amet laborum.`,
        voteCount: 42,
        election: "e2",
    },
    {
        id: "c7",
        fullName: "Minami Ganyo",
        image: Candidate7,
        motto: `Sed quibusdam recusandae alias error harum maxime adipisci amet laborum.`,
        voteCount: 190,
        election: "e2",
    }
]

export const voters = [
    {
        id: "v1",
        fullName: "Ernest Achiever", 
        email: "achiever@gmail.com", 
        password: "achiever123",
        isAdmin: true,
        votedElections: ["e2"]
    },
    {
        id: "v2",
        fullName: "Doris Lartey", 
        email: "doris@gmail.com",
        password: "doris123",
        isAdmin: false,
        votedElections: ["e1", "e2"]
    },
    {
        id: "v3",
        fullName: "Daniel Vinyo", 
        email: "daniel@gmail.com", 
        password: "daniel123",
        isAdmin: false,
        votedElections: ["e1", "e2"]
    },
    {
        id: "v4",
        fullName: "Diana Ayi", 
        email: "diana@gmail.com", 
        password: "diana123",
        isAdmin: true, 
        votedElections: []       
    }
]