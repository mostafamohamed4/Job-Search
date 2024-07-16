import { connect } from 'mongoose'
export async function main() {

    await connect('mongodb://127.0.0.1:27017/Job-Search').then(() => {
        console.log("database connect");
    }).catch(() => {
        console.log("database not connect");
    })
}