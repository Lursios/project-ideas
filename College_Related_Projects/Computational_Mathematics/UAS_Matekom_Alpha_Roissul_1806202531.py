class Temp_converter():
    def __init__(self,temp_awal,satuan_awal,satuan_akhir) :
        self.temp_awal = temp_awal
        self.satuan_awal = satuan_awal
        self.satuan_akhir = satuan_akhir

    def fahrenheit(self):
        if self.satuan_akhir == "c":
            C = round((self.temp_awal - 32)* (5/9),2)
            return C
        elif self.satuan_akhir == "k":
            K = ((self.temp_awal - 32)/1.8)+273
            return K
        elif self.satuan_akhir == "f":
            return self.temp_awal
        else:
            return "Please try again with correct units"
    def celcius(self):
        if self.satuan_akhir == "f":
            F = (self.temp_awal * 9/5) + 32
            return F
        elif self.satuan_akhir == "k":
            K = self.temp_awal + 273
            return K
        elif self.satuan_akhir == "c":
            return self.temp_awal
        else:
            return "Please try again with correct units"
    def kelvin(self):
        if self.satuan_akhir == "f":
            F = ((self.temp_awal - 273)*1.8)+ 32
            return F
        elif self.satuan_akhir == "c":
            K = self.temp_awal - 273
            return K
        elif self.satuan_akhir == "k":
            return self.temp_awal
        else:
            return "Please try again with correct units"

#Buat Program Utamanya 
def main() :
# Main Menu 
    running = True
#Menu Pertama 
    while running :
        print("Mau Ngapain ??? \n1.Ubah nilai temperature \n2.Interpolasi\n(ketik quit untuk keluar)")
        pilihan_menu =input("").lower()
        if pilihan_menu == "1" :
            print("Ubah temperature")
            ok = True
            while ok :
                try :
                    temp_awal = int(input("Temperature awal ? "))
                    satuan_awal = input("Notes : C = celcius, F = Fahreheit, K = Kelvin\nSatuanya apa ? ").lower()
                    satuan_akhir = input("Notes : C = celcius, F = Fahreheit, K = Kelvin\nUbah menjadi apa ? ").lower()
                    Ubah_Temperature = Temp_converter(temp_awal,satuan_awal,satuan_akhir)
                    ok = False
                except :
                    print("Tolong disesuaikan dengan yang ditanya")
            if satuan_awal == "f":
                print(round(Ubah_Temperature.fahrenheit(),2))
            elif satuan_awal == "c":
                print(round(Ubah_Temperature.celcius(),2))
            elif satuan_awal == "k" :
                print(round(Ubah_Temperature.kelvin(),2))
            else :
                print("Tolong diulang \nNotes : C = celcius, F = Fahreheit, K = Kelvin")
    #Menu kedua 
        elif pilihan_menu == "2" :
            print("Lagi dibuat")
    #Keluar Program 
        elif pilihan_menu == "quit":
            print("Semoga Sukses Ujianyaa !!!")
            running = False
        else :
            print("Bukan Pilihan")

# Menjalankan Program
main()

        