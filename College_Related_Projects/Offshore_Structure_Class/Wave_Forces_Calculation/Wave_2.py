import math
from matplotlib import pyplot as plt
import numpy as np
class BLP:
    gravity = 9.81
    seawater_kinematic_viscocity = 1.17*10**(-6)
    seawater_density = 1030
    seawater_dynamic_viscocity = 0
    z = 0 # Unless state otherwise 
    wt = 0 # Unless state otherwise
    x = 0 # Unless state otherwise
    pi = 3.14

    def __init__(self,T,d,H,D):
        self.T = T # Wave Periode in second
        self.d = d # depth of wave from still water line 
        self.H = H # wave height
        self.D = D # Leg diameter 

    def wavelength(self):
        Lo =(self.gravity*self.T**2)/(2*self.pi)
        L  = Lo*(math.tanh((2*self.pi*self.d)/Lo))**0.5
        return round(L,2) 

    def wave_number(self):
        return round((2*self.pi/self.wavelength()),2)

    def wv_class_vel(self): # Wave classification for determining velocity and acc formula
        if self.wavelength()*0.05 < self.d < self.wavelength()*0.5 :
            return "intermediate waves"
        elif self.d >=self.wavelength()*0.5 :
            return "deep waves"
        else:
            return "shallow waves"

    def wv_hor_vel(self):
        if self.wv_class_vel()== "intermediate waves":
            numerator = self.pi*self.H*math.cosh(self.wave_number()*(self.z+self.d))
            denominator= self.T*math.sinh(self.wave_number()*self.d)
            u = (numerator/denominator)*math.cos(self.wave_number()*self.x-self.wt)
            return round(u,2)
        elif self.wv_class_vel()== "shallow waves":
            u=(self.pi*self.H/self.T)*math.exp(self.wave_number()*self.z)*math.cos(self.wave_number()*self.x-self.wt)
            return round(u,2)
        else:
             u=(self.pi*self.H/self.T)*(1/self.wave_number()*self.d)*math.cos(self.wave_number()*self.x-self.wt)
             return round(u,2)
        
    def kue_carp_number(self): # Kuelegen carpenter Number 
        return round(self.wv_hor_vel()*(self.T/self.D),2)
    def reynolds_number(self):
        try :
            re= round((self.seawater_density*self.wv_hor_vel()*self.D/self.seawater_dynamic_viscocity),2)
            return re
        except:
            re = self.wv_hor_vel()*self.D/self.seawater_kinematic_viscocity
            return round(re,2)
    def coefficients(self):
        if self.kue_carp_number()>25 :
            if self.reynolds_number()> 1.5*10**6 :
                return {"Cm" : 1.8, "Cd" :0.62}
            elif 10**5< self.reynolds_number()<1.5*10**6 :
                return {"Cm" : 1.8, "Cd" :0.75}
        elif self.kue_carp_number() < 5:
                return {"Cm" : 2, "Cd" :0}
        else:
                return {"Cm" : 1.8, "Cd" :0.62}
    
    def A1(self):
        return round((self.pi*(self.D/2)/(2*self.H)),2)

    def A2(self):
        numerator = (self.gravity*self.T**2)*(2*self.wave_number()*self.d + math.sinh(2*self.wave_number()*self.d))
        denominator = 16*self.pi*self.wavelength()*math.sinh(2*self.wave_number()*self.d)
        return numerator/denominator

    def Inertia_Force(self,angle):
        w = (2*self.pi*self.seawater_density*(self.D/2)*self.H**2*self.wavelength())/self.T**2   # Assumed a random variable for easier formulating
        FI = w*self.A1()*self.coefficients()["Cm"]*math.sin(angle)
        return FI
    
    def Drag_Force(self,angle):
        w = (2*self.pi*self.seawater_density*(self.D/2)*self.H**2*self.wavelength())/self.T**2 
        FD = w*self.A2()*self.coefficients()["Cd"]*abs(math.cos(angle))*math.cos(angle)
        return FD

    def Morrison_Force_Equation(self,angle):
        F = self.Inertia_Force(angle) + self.Drag_Force(angle)
        return F

#The main program still not complete
T =int(input("What is the wave period ? "))
d = int(input("What is the depth of the wave ? "))
H = int(float(input("What's the wave height ? ")))
D = int(input("What is the diameter of the main leg ? "))
A = 360 #if only 1 angle is taken 

UTS = BLP(T,d,H,D)
if D/UTS.wavelength()> 0.2 :
    print("Don't Use Morisson Use Diffraction theory instead")
else : 
    print("wavelength : {} m the classification is {} the horizontal acceleration : {} m/s^2 the wave number : {} the reynold number : {} the Kuelegen-Carpenter number : {} the drag coefficient : {} the inertia coefficient : {} A1 : {} A2 : {} Drag Force : {} Inertia Force : {} Total Force : {}".format(UTS.wavelength(),UTS.wv_class_vel(),UTS.wv_hor_vel(),UTS.wave_number(),UTS.reynolds_number(),UTS.kue_carp_number(),UTS.coefficients()["Cd"],UTS.coefficients()["Cm"],UTS.A1(),UTS.A2(),UTS.Drag_Force(A),UTS.Inertia_Force(A),UTS.Morrison_Force_Equation(A)))

# Making the graph 
FD=[]
FI = []
F = []
angles = np.linspace(0,6.28,34)
for angle in angles:
    FI.append(UTS.Inertia_Force(angle))
    FD.append(UTS.Drag_Force(angle))
    F.append(UTS.Morrison_Force_Equation(angle))
print(FI)
print(FD)
print(F)

plt.plot(angles,FD,"rx-",label="Drag",color="green")
plt.plot(angles,FI,"rx-",label="Inertia")
plt.plot(angles,F,"bo--",label="Total Force")
plt.title("Values difference in Morris Equation")
plt.xlabel("Angle")
plt.ylabel("Forces")
plt.legend()
plt.show()


