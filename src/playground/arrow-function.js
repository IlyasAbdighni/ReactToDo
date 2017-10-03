const user = {
    name: 'ilyas',
    cities: ['Urumqi', 'Xi\'An', 'Bei Jing', 'Macerata' ],
    printPlaces: function() {
        // const self = this;
        this.cities.forEach( (city) => {
            console.log(this.name + " has lived in " + city);
        })
        
    }
};

user.printPlaces();