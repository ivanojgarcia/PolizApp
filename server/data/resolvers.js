import fetch from "node-fetch"

const baseURL = `https://dn8mlk7hdujby.cloudfront.net/interview/insurance/policy `;
const withouthSonHealth =  0.279;
const withOneSonHealth =  0.4396;
const withMoreSonHealth =  0.5599;

const withouthSonDental =  0.12;
const withOneSonDental =  0.1950;
const withMoreSonDental =  0.2480;
// const baseURL = `https://jsonplaceholder.typicode.com`
export const resolvers = {
    Query: {
        getPolicy: async (root) => {
         return await fetch(`${baseURL}`, {
                method: 'GET'
            })
            .then((response) => response.json());
        },
        getCostByEmployee: async (root) => {
            // El costo de la cobertura por empleado es el total en base al porcentaje de a la cobertura, su edad y el monto.
            let withoutPolicy = [];
            let withPolicy = [];
            let policyHealth = [];
            let policyDental = [];
            const policy = await fetch(`${baseURL}`, {
                   method: 'GET'
               })
               .then((response) => { return response.json()});

               const percentage = policy.policy.company_percentage;
               const isDental = policy.policy.has_dental_care;
               const workers = policy.policy.workers;

                // Si el valor "has_dental_care" es true el valor de la poliza a utilizar serán dentales
                // en caso contrario será de vida/salud
               if(isDental){
                    let withouthSon =  0.12;
                    let withOneSon =  0.1950;
                    let withMoreSon =  0.2480;
                }else{
                    let withouthSon =  0.279;
                    let withOneSon=  0.4396;
                    let withMoreSon =  0.5599;
                }
                workers.map((worker, i) => {
                    // Poliza de Vida
                    if(worker.age >= 65){
                        worker.coverageHealth = 0;
                        worker.coverageDental = 0;
                        withoutPolicy.push(worker);
                    }else{
                        if(worker.childs === 0){
                            worker.coverageHealth = (percentage === 100) ? withouthSonHealth : ((withouthSonHealth * percentage) / 100).toFixed(4);
                            worker.coverageDental = (percentage === 100) ? withouthSonDental : ((withouthSonDental * percentage) / 100).toFixed(4);
                        }else{
                            if(worker.childs === 1){
                                worker.coverageHealth = (percentage === 100) ? withOneSonHealth : ((withOneSonHealth * percentage) / 100).toFixed(4);
                                worker.coverageDental = (percentage === 100) ? withOneSonDental : ((withOneSonDental * percentage) / 100).toFixed(4);
                            }else{
                                if(worker.childs >= 2){
                                    worker.coverageHealth = (percentage === 100) ? withMoreSonHealth : ((withMoreSonHealth * percentage) / 100).toFixed(4);
                                    worker.coverageDental = (percentage === 100) ? withMoreSonDental : ((withMoreSonDental * percentage) / 100).toFixed(4);
                                }
                            }
                        }
                        withPolicy.push(worker)
                    }
                })


                return {
                    percentage: percentage,
                    isDental: isDental,
                    withPolicy: withPolicy,
                    withoutPolicy: withoutPolicy
                };
           },
    }
}

export default resolvers;