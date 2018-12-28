module.exports = { 
    getData: () => {
        
        const data = {
            data: [
                {id : 1, ganttData: { customer: "צרכן אב 1" }, toShow: false},
                {id : 2, start_date: '27-12-2018 08:00', end_date: '27-12-2018 17:30', ganttData: { name: "משימה 1", customer: "צרכן 1", ok: "123", flight: "999", sensor: "סנסור1", plat: "כבד", weapon: "לידוי", phone: "087-73534" } , parent: 1, toShow: true},
                {id : 3, start_date: '25-12-2018 18:00', end_date: '26-12-2018 05:30', ganttData: { name: "משימה 2", customer: "צרכן 2", ok: "123", flight: "999", sensor: "סנסור1", plat: "חלק", weapon: "אסטמה", phone: "087-73534" }, parent: 1, toShow: true},
                {id : 4, ganttData: { customer: "צרכן אב 2" }, toShow: false},
                {id : 5, start_date: '26-12-2018 08:00', end_date: '26-12-2018 19:30', ganttData: { name: "משימה 1", customer: "צרכן 1", ok: "123", flight: "999", sensor: "סנסור1", plat: "כבד", weapon: "שקד", phone: "087-73534" }, parent: 4, toShow: true}
            ]
        };

        return (data);
    }
}