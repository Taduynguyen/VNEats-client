import mylanding from '../assets/mylanding.png';


import appDownload from '../assets/appDownload.png'

const HomePage = () => {
    return (
        <div className="flex flex-col gap-12">
            <div className="bg-white py-8 rounded-lg shadow-md flex flex-col gap-5 text-center -mt-16">
                <h1 className="text-5xl font-bold tracking-tight text-orange-600">
                    Chào mừng chào mừng hoan hô
                </h1>
                <span className="text-xl">Chỉ một ngón tay, đồ ăn đến ngay</span>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
                <img src={mylanding} />
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <span className="font-bold text-3xl tracking-tighter">
                        Đặt món nhanh hơn với VNEats App
                    </span>
                    <span>
                        Tải ứng dụng VNEats để đặt hàng nhanh hơn và nhận các gợi ý phù hợp cho bạn!
                    </span>
                    <img src={appDownload} />
                </div>
            </div>
        </div>
    )
}

export default HomePage;