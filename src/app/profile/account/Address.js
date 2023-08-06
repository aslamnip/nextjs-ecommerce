'use client'
import React, { useEffect, useState } from 'react';

const BangladeshiDistrictsAndUpazilas = (props) => {
    const { setSelectedDistrict, setSelectedUpazila, selectedDistrict, selectedUpazila, profile } = props
    // Sample data - replace this with actual data from API or JSON file
    const [districts, setDistricts] = useState([
        "Bagerhat",
        "Bandarban",
        "Barguna",
        "Barishal",
        "Bhola",
        "Bogra",
        "Brahmanbaria",
        "Chandpur",
        "Chattogram",
        "Chuadanga",
        "Comilla",
        "Cox's Bazar",
        "Dhaka",
        "Dinajpur",
        "Faridpur",
        "Feni",
        "Gaibandha",
        "Gazipur",
        "Gopalganj",
        "Habiganj",
        "Jamalpur",
        "Jessore",
        "Jhalokati",
        "Jhenaidah",
        "Joypurhat",
        "Khagrachari",
        "Khulna",
        "Kishoreganj",
        "Kurigram",
        "Kushtia",
        "Lakshmipur",
        "Lalmonirhat",
        "Madaripur",
        "Magura",
        "Manikganj",
        "Meherpur",
        "Moulvibazar",
        "Munshiganj",
        "Mymensingh",
        "Naogaon",
        "Narail",
        "Narayanganj",
        "Narsingdi",
        "Natore",
        "Netrokona",
        "Nilphamari",
        "Noakhali",
        "Pabna",
        "Panchagarh",
        "Patuakhali",
        "Pirojpur",
        "Rajbari",
        "Rajshahi",
        "Rangamati",
        "Rangpur",
        "Satkhira",
        "Shariatpur",
        "Sherpur",
        "Sirajganj",
        "Sunamganj",
        "Sylhet",
        "Tangail",
        "Thakurgaon",
    ]);



    // Sample data - replace this with actual data from API or JSON file
    const upazilasMap = {
        Comilla: [
            'Debidwar', 'Barura', 'Brahmanpara', 'Chandina', 'Chauddagram',
            'Daudkandi', 'Homna', 'Laksam', 'Muradnagar', 'Nangalkot',
            'Cumillasadar', 'Meghna', 'Monohargonj', 'Sadarsouth', 'Titas', 'Burichang', 'Lalmai'
        ],
        Feni: ['Chhagalnaiya', 'Sadar', 'Sonagazi', 'Fulgazi', 'Parshuram', 'Daganbhuiyan'],
        Brahmanbaria: ['Sadar', 'Kasba', 'Nasirnagar', 'Sarail', 'Ashuganj', 'Akhaura', 'Nabinagar', 'Bancharampur', 'Bijoynagar'],
        Rangamati: ['Sadar', 'Kaptai', 'Kawkhali', 'Baghaichari', 'Barkal', 'Langadu', 'Rajasthali', 'Belaichari', 'Juraichari', 'Naniarchar'],
        Noakhali: ['Sadar', 'Companiganj', 'Begumganj', 'Hatia', 'Subarnachar', 'Kabirhat', 'Senbug', 'Chatkhil', 'Sonaimuri'],
        Chandpur: ['Haimchar', 'Kachua', 'Shahrasti', 'Sadar', 'Matlabsouth', 'Hajiganj', 'Matlabnorth', 'Faridgonj'],
        Lakshmipur: ['Sadar', 'Kamalnagar', 'Raipur', 'Ramgati', 'Ramganj'],
        Chattogram: [
            'Rangunia', 'Sitakunda', 'Mirsharai', 'Patiya', 'Sandwip', 'Banshkhali',
            'Boalkhali', 'Anwara', 'Chandanaish', 'Satkania', 'Lohagara', 'Hathazari',
            'Fatikchhari', 'Raozan', 'Karnafuli'
        ],
        "Cox's Bazar": ['Sadar', 'Chakaria', 'Kutubdia', 'Ukhiya', 'Moheshkhali', 'Pekua', 'Ramu', 'Teknaf'],
        Khagrachari: ['Sadar', 'Dighinala', 'Panchari', 'Laxmichhari', 'Mohalchari', 'Manikchari', 'Ramgarh', 'Matiranga', 'Guimara'],
        Bandarban: ['Sadar', 'Alikadam', 'Naikhongchhari', 'Rowangchhari', 'Lama', 'Ruma', 'Thanchi'],
        Rajshahi: [
            'Belkuchi', 'Chauhali', 'Kamarkhand', 'Kazipur', 'Raigonj', 'Shahjadpur',
            'Sirajganjsadar', 'Tarash', 'Ullapara'
        ],
        Pabna: ['Sujanagar', 'Ishurdi', 'Bhangura', 'Pabnasadar', 'Bera', 'Atghoria', 'Chatmohar', 'Santhia', 'Faridpur'],
        Bogra: [
            'Kahaloo', 'Sadar', 'Shariakandi', 'Shajahanpur', 'Dupchanchia', 'Adamdighi',
            'Nondigram', 'Sonatala', 'Dhunot', 'Gabtali', 'Sherpur', 'Shibganj'
        ],
        Rajshahi: ['Paba', 'Durgapur', 'Mohonpur', 'Charghat', 'Puthia', 'Bagha', 'Godagari', 'Tanore', 'Bagmara'],
        Natore: ['Natoresadar', 'Singra', 'Baraigram', 'Bagatipara', 'Lalpur', 'Gurudaspur', 'Naldanga'],
        Joypurhat: ['Akkelpur', 'Kalai', 'Khetlal', 'Panchbibi', 'Joypurhatsadar'],
        Chapainawabganj: ['Chapainawabganjsadar', 'Gomostapur', 'Nachol', 'Bholahat', 'Shibganj'],
        Naogaon: [
            'Mohadevpur', 'Badalgachi', 'Patnitala', 'Dhamoirhat', 'Niamatpur', 'Manda',
            'Atrai', 'Raninagar', 'Naogaonsadar', 'Porsha', 'Sapahar'
        ],
        Khulna: [
            'Manirampur', 'Abhaynagar', 'Bagherpara', 'Chougachha', 'Jhikargacha', 'Keshabpur',
            'Sadar', 'Sharsha'
        ],
        Satkhira: ['Assasuni', 'Debhata', 'Kalaroa', 'Satkhirasadar', 'Shyamnagar', 'Tala', 'Kaliganj'],
        Meherpur: ['Mujibnagar', 'Meherpursadar', 'Gangni'],
        Narail: ['Narailsadar', 'Lohagara', 'Kalia'],
        Chuadanga: ['Chuadangasadar', 'Alamdanga', 'Damurhuda', 'Jibannagar'],
        Kushtia: ['Kushtiasadar', 'Kumarkhali', 'Khoksa', 'Mirpurkushtia', 'Daulatpur', 'Bheramara'],
        Magura: ['Shalikha', 'Sreepur', 'Magurasadar', 'Mohammadpur'],
        Jessore: [
            'Manirampur', 'Abhaynagar', 'Bagherpara', 'Chougachha', 'Jhikargacha', 'Keshabpur',
            'Sadar', 'Sharsha'
        ],
        Satkhira: ['Assasuni', 'Debhata', 'Kalaroa', 'Satkhirasadar', 'Shyamnagar', 'Tala', 'Kaliganj'],
        Meherpur: ['Mujibnagar', 'Meherpursadar', 'Gangni'],
        Narail: ['Narailsadar', 'Lohagara', 'Kalia'],
        Chuadanga: ['Chuadangasadar', 'Alamdanga', 'Damurhuda', 'Jibannagar'],
        Magura: ['Shalikha', 'Sreepur', 'Magurasadar', 'Mohammadpur'],
        Khulna: [
            'Paikgasa', 'Fultola', 'Digholia', 'Rupsha', 'Terokhada', 'Dumuria', 'Botiaghata',
            'Dakop', 'Koyra'
        ],
        Bagerhat: [
            'Fakirhat', 'Sadar', 'Mollahat', 'Sarankhola', 'Rampal', 'Morrelganj', 'Kachua',
            'Mongla', 'Chitalmari'
        ],
        Jhenaidah: ['Sadar', 'Shailkupa', 'Harinakundu', 'Kaliganj', 'Kotchandpur', 'Moheshpur'],
        Barishal: [
            'Barishal Sadar', 'Bakerganj', 'Babuganj', 'Wazirpur', 'Banaripara', 'Gournadi',
            'Agailjhara', 'Mehendiganj', 'Muladi', 'Hizla'
        ],
        Bhola: ['Sadar', 'Borhanuddin', 'Charfesson', 'Doulatkhan', 'Monpura', 'Tazumuddin', 'Lalmohan'],
        Barguna: ['Amtali', 'Sadar', 'Betagi', 'Bamna', 'Pathorghata', 'Taltali'],
        Sylhet: {
            Sadar: ['Balaganj', 'Beanibazar', 'Bishwanath', 'Companiganj', 'Fenchuganj', 'Golapganj', 'Gowainghat', 'Jaintiapur', 'Kanaighat'],
            Dakshinsurma: ['Osmaninagar', 'Zakiganj'],
        },
        Moulvibazar: ['Barlekha', 'Kamolganj', 'Kulaura', 'Moulvibazarsadar', 'Rajnagar', 'Sreemangal', 'Juri'],
        Habiganj: ['Nabiganj', 'Bahubal', 'Ajmiriganj', 'Baniachong', 'Lakhai', 'Chunarughat', 'Habiganjsadar', 'Madhabpur', 'Shayestaganj'],
        Sunamganj: {
            Sadar: ['Southsunamganj', 'Bishwambarpur', 'Chhatak', 'Jagannathpur', 'Dowarabazar', 'Tahirpur'],
            Dharmapasha: ['Jamalganj', 'Shalla'],
        },
        Narsingdi: ['Belabo', 'Monohardi', 'Narsingdisadar', 'Palash', 'Raipura', 'Shibpur'],
        Gazipur: ['Kaliganj', 'Kaliakair', 'Kapasia', 'Sadar', 'Sreepur'],
        Shariatpur: ['Sadar', 'Naria', 'Zajira', 'Gosairhat', 'Bhedarganj', 'Damudya'],
        Narayanganj: ['Araihazar', 'Bandar', 'Narayanganjsadar', 'Rupganj', 'Sonargaon'],
        Tangail: [
            'Basail', 'Bhuapur', 'Delduar', 'Ghatail', 'Gopalpur', 'Madhupur', 'Mirzapur',
            'Nagarpur', 'Sakhipur', 'Tangailsadar', 'Kalihati', 'Dhanbari'
        ],
        Kishoreganj: [
            'Itna', 'Katiadi', 'Bhairab', 'Tarail', 'Hossainpur', 'Pakundia', 'Kuliarchar',
            'Kishoreganjsadar', 'Karimgonj', 'Bajitpur', 'Austagram', 'Mithamoin', 'Nikli'
        ],
        Manikganj: ['Harirampur', 'Saturia', 'Sadar', 'Gior', 'Shibaloy', 'Doulatpur', 'Singiar'],
        Dhaka: ["Dhaka North",'Dhaka South','Savar', 'Dhamrai', 'Keraniganj', 'Nawabganj', 'Dohar'],
        Munshiganj: ['Sadar', 'Sreenagar', 'Sirajdikhan', 'Louhajanj', 'Gajaria', 'Tongibari'],
        Rajbari: ['Sadar', 'Goalanda', 'Pangsa', 'Baliakandi', 'Kalukhali'],
        Madaripur: ['Sadar', 'Shibchar', 'Kalkini', 'Rajoir', 'Dasar'],
        Gopalganj: ['Sadar', 'Kashiani', 'Tungipara', 'Kotalipara', 'Muksudpur'],
        Faridpur: [
            'Sadar', 'Alfadanga', 'Boalmari', 'Sadarpur', 'Nagarkanda', 'Bhanga', 'Charbhadrasan',
            'Madhukhali', 'Saltha'
        ],
        Panchagarh: ['Panchagarhsadar', 'Debiganj', 'Boda', 'Atwari', 'Tetulia'],
        Dinajpur: [
            'Nawabganj', 'Birganj', 'Ghoraghat', 'Birampur', 'Parbatipur', 'Bochaganj',
            'Kaharol', 'Fulbari', 'Dinajpursadar', 'Hakimpur', 'Khansama', 'Birol', 'Chirirbandar'
        ],
        Lalmonirhat: ['Sadar', 'Kaliganj', 'Hatibandha', 'Patgram', 'Aditmari'],
        Nilphamari: ['Syedpur', 'Domar', 'Dimla', 'Jaldhaka', 'Kishorganj', 'Nilphamarisadar'],
        Gaibandha: ['Sadullapur', 'Gaibandhasadar', 'Palashbari', 'Saghata', 'Gobindaganj', 'Sundarganj', 'Phulchari'],
        Thakurgaon: ['Thakurgaonsadar', 'Pirganj', 'Ranisankail', 'Haripur', 'Baliadangi'],
        Mymensingh: {
            Sadar: [
                'Fulbaria', 'Trishal', 'Bhaluka', 'Muktagacha', 'Mymensinghsadar', 'Dhobaura', 'Phulpur',
                'Haluaghat', 'Gouripur', 'Gafargaon', 'Iswarganj', 'Nandail', 'Tarakanda'
            ],
            Gafargaon: ['Nandail', 'Tarakanda'],
        },
        Jamalpur: ['Jamalpursadar', 'Melandah', 'Islampur', 'Dewangonj', 'Sarishabari', 'Madarganj', 'Bokshiganj'],
        Netrokona: ['Barhatta', 'Durgapur', 'Kendua', 'Atpara', 'Madan', 'Khaliajuri', 'Kalmakanda', 'Mohongonj', 'Purbadhala', 'Netrokonasadar'],
    };
    useEffect(() => {
        setSelectedDistrict(profile.district)
        setSelectedUpazila(profile.upzila)
    }, [profile, setSelectedDistrict, setSelectedUpazila])
    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
        setSelectedUpazila('');
    };

    const handleUpazilaChange = (event) => {
        setSelectedUpazila(event.target.value);
    };

    return (
        <div className='mt-3'>
            <label>
                District:
                <select className='form-select mt-2' value={selectedDistrict} onChange={handleDistrictChange}>
                    <option value="">Select a district</option>
                    {districts.map((district) => (
                        <option key={district} value={district}>
                            {district}
                        </option>
                    ))}
                </select>
            </label>

            {selectedDistrict && (
                <label className='ms-5'>
                    Upazila:
                    <select className='form-select  mt-2' value={selectedUpazila} onChange={handleUpazilaChange}>
                        <option value="">Select an Upazila</option>
                        {upazilasMap[selectedDistrict].map((upazila) => (
                            <option key={upazila} value={upazila}>
                                {upazila}
                            </option>
                        ))}
                    </select>
                </label>
            )}
        </div>
    );
};

export default BangladeshiDistrictsAndUpazilas;
