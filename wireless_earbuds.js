let selectedAddressType = '';

// City and Zone data for each region
const regionData = {
    'Dhaka': {
        cities: ['Dhaka', 'Gazipur', 'Narayanganj', 'Tangail', 'Manikganj', 'Munshiganj', 'Faridpur'],
        zones: {
            'Dhaka': ['Dhanmondi', 'Gulshan', 'Banani', 'Uttara', 'Mirpur', 'Mohammadpur', 'Old Dhaka', 'Wari', 'Ramna', 'Tejgaon', 'Pallabi', 'Badda', 'Rampura', 'Motijheel', 'Lalbagh'],
            'Gazipur': ['Gazipur Sadar', 'Kaliakair', 'Kapasia', 'Sreepur', 'Kaliganj'],
            'Narayanganj': ['Narayanganj Sadar', 'Araihazar', 'Sonargaon', 'Rupganj', 'Siddhirganj'],
            'Tangail': ['Tangail Sadar', 'Mirzapur', 'Kalihati', 'Madhupur', 'Gopalpur'],
            'Manikganj': ['Manikganj Sadar', 'Singair', 'Shibalaya', 'Saturia', 'Harirampur'],
            'Munshiganj': ['Munshiganj Sadar', 'Sreenagar', 'Sirajdikhan', 'Lohajang', 'Gazaria'],
            'Faridpur': ['Faridpur Sadar', 'Boalmari', 'Alfadanga', 'Madhukhali', 'Sadarpur']
        }
    },
    'Chattogram': {
        cities: ['Chattogram', 'Cox\'s Bazar', 'Comilla', 'Feni', 'Brahmanbaria', 'Rangamati', 'Noakhali'],
        zones: {
            'Chattogram': ['Chittagong Sadar', 'Double Mooring', 'Kotwali', 'Pahartali', 'Panchlaish', 'Khulshi', 'Halishahar'],
            'Cox\'s Bazar': ['Cox\'s Bazar Sadar', 'Chakaria', 'Teknaf', 'Ukhia', 'Ramu', 'Pekua'],
            'Comilla': ['Comilla Sadar', 'Daudkandi', 'Brahmanpara', 'Chandina', 'Chauddagram', 'Debidwar'],
            'Feni': ['Feni Sadar', 'Chhagalnaiya', 'Daganbhuiyan', 'Parshuram', 'Sonagazi', 'Fulgazi'],
            'Brahmanbaria': ['Brahmanbaria Sadar', 'Kasba', 'Nasirnagar', 'Sarail', 'Ashuganj', 'Akhaura'],
            'Rangamati': ['Rangamati Sadar', 'Kaptai', 'Kawkhali', 'Baghaichhari', 'Barkal', 'Langadu'],
            'Noakhali': ['Noakhali Sadar', 'Begumganj', 'Chatkhil', 'Companiganj', 'Hatiya', 'Senbagh']
        }
    },
    'Rajshahi': {
        cities: ['Rajshahi', 'Bogura', 'Pabna', 'Sirajganj', 'Natore', 'Joypurhat', 'Chapainawabganj', 'Naogaon'],
        zones: {
            'Rajshahi': ['Rajshahi Sadar', 'Boalia', 'Motihar', 'Rajpara', 'Shah Makhdum', 'Paba', 'Durgapur'],
            'Bogura': ['Bogura Sadar', 'Kahalu', 'Sariakandi', 'Shajahanpur', 'Dupchanchia', 'Adamdighi'],
            'Pabna': ['Pabna Sadar', 'Ishwardi', 'Bera', 'Atgharia', 'Chatmohar', 'Santhia'],
            'Sirajganj': ['Sirajganj Sadar', 'Kamarkhand', 'Kazipur', 'Raiganj', 'Shahjadpur', 'Tarash'],
            'Natore': ['Natore Sadar', 'Singra', 'Baraigram', 'Bagatipara', 'Lalpur', 'Gurudaspur'],
            'Joypurhat': ['Joypurhat Sadar', 'Akkelpur', 'Kalai', 'Khetlal', 'Panchbibi'],
            'Chapainawabganj': ['Chapainawabganj Sadar', 'Gomastapur', 'Nachole', 'Bholahat', 'Shibganj'],
            'Naogaon': ['Naogaon Sadar', 'Manda', 'Atrai', 'Raninagar', 'Patnitala', 'Dhamoirhat']
        }
    },
    'Khulna': {
        cities: ['Khulna', 'Jessore', 'Satkhira', 'Magura', 'Narail', 'Bagerhat', 'Chuadanga', 'Meherpur', 'Kushtia', 'Jhenaidah'],
        zones: {
            'Khulna': ['Khulna Sadar', 'Sonadanga', 'Khalishpur', 'Doulatpur', 'Khan Jahan Ali', 'Kotwali', 'Harintana'],
            'Jessore': ['Jessore Sadar', 'Abhaynagar', 'Bagherpara', 'Chaugachha', 'Jhikargachha', 'Keshabpur'],
            'Satkhira': ['Satkhira Sadar', 'Assasuni', 'Debhata', 'Kalaroa', 'Kaliganj', 'Patkelghata', 'Shyamnagar'],
            'Magura': ['Magura Sadar', 'Mohammadpur', 'Shalikha', 'Sreepur'],
            'Narail': ['Narail Sadar', 'Lohagara', 'Kalia'],
            'Bagerhat': ['Bagerhat Sadar