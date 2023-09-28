import csv 
import os
from itertools import cycle
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import pandas as pd


def clear():
    os.system( 'cls' )
    
def make(csv_file):
    csv_value = []
    with open(csv_file,mode = "r",newline="") as f :
        reader = csv.reader(f,delimiter=",")
        for row in reader:
            csv_value.append(row)
    return (csv_value[1:])

def url_maker(src_keywords):
    keys = []
    last_key = src_keywords.pop(-1)
    n = 0
    search_for = ""
    for keyword in range(len(src_keywords)):
        keys.append(src_keywords[n]+ "%20")
        n =+1
    keys.append(last_key)
    search_for = search_for.join(keys)
    url =f"https://www.tokopedia.com/search?page=1&q={search_for}&srp_component_id=02.01.00.00&st=product"
    return url

def next_page_url(url,next_page):
    nexpag=url.replace("1",str(next_page),1)
    return nexpag

def saver(save_format,scraped_datas,search_keywords):
    file_name ="".join(search_keywords)
    if save_format == 1 :
        with open(f"{file_name}.csv",mode = "w",newline="") as f :
            writer = csv.writer(f,delimiter=",")
            writer.writerow(["Product Name","Price","Links","Page"])
            for page in range(len(scraped_datas["Product Name"])):
                for item in range(len(scraped_datas["Product Name"][0])):
                    writer.writerow([scraped_datas["Product Name"][page][item],scraped_datas["Price"][page][item],scraped_datas["Link"][page][item],[page+1]])            
    elif save_format == 2:
        pass
    elif save_format == 3:
        pass
    elif save_format == 4:
        pass
    else:
        print("Please select a number")

def user_agent_changer(iteration):
    if iteration == 1 :
        User_Agent = cycle(make("UA's.csv"))
        opts = Options()
        opts.add_argument(f"user-agent={User_Agent}")
        driver = webdriver.Chrome(chrome_options=opts)
    elif iteration%30 == 0 :
        User_Agent = next(cycle(make("UA's.csv")))
        opts = Options()
        opts.add_argument(f"user-agent={User_Agent}")
        driver = webdriver.Chrome(chrome_options=opts)
    else :
        return User_Agent

def proxy_changer(iteration):
    if iteration == 1 :
        PROXY = cycle(make("Proxies.csv"))
        webdriver.DesiredCapabilities.CHROME['proxy']={
            "httpProxy":PROXY,
            "ftpProxy":PROXY,
            "sslProxy":PROXY,
            
            "proxyType":"MANUAL",  
        }
    elif iteration%25 == 0 :
        PROXY = next(cycle(make("Proxies.csv")))
        webdriver.DesiredCapabilities.CHROME['proxy']={
            "httpProxy":PROXY,
            "ftpProxy":PROXY,
            "sslProxy":PROXY,
            
            "proxyType":"MANUAL",  
        }
    else:
        return PROXY

def scrapetokped(url,page,webdriver_loc="C:\Program Files (x86)\chromedriver.exe"):
    PATH = Service(webdriver_loc)
    driver = webdriver.Chrome(service=PATH)
    driver.get(url)
    driver.execute_script("window.scrollTo(0,document.body.scrollHeight)") #Scroll to bottom of page
    try:
        element = WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.CLASS_NAME,"css-1p7g6w2-unf-pagination-item"))
        )
        if page > 1 :
            product_name = [product.text for product in driver.find_elements(By.CLASS_NAME,"css-1b6t4dn")]
            prices = [price.text for price in driver.find_elements(By.CLASS_NAME,"css-1ksb19c")]
            links = [link.get_attribute("href") for link in driver.find_elements(By.TAG_NAME,"a")]
            product_links = list(dict.fromkeys(links[16:182]))#rm duplicate in order and turn into a list
            data = {"Product Name" : product_name,"Price":prices,"Link":product_links}
            driver.quit()
            return data
        else:
            pages= [page.text for page in driver.find_elements(By.CLASS_NAME,"css-1p7g6w2-unf-pagination-item")]
            product_name = [product.text for product in driver.find_elements(By.CLASS_NAME,"css-1b6t4dn")]
            prices = [price.text for price in driver.find_elements(By.CLASS_NAME,"css-1ksb19c")]
            links = [link.get_attribute("href") for link in driver.find_elements(By.TAG_NAME,"a")]
            product_links = list(dict.fromkeys(links[16:182]))#rm duplicate in order and turn into a list
            data = {"Product Name" : product_name,"Price":prices,"Link":product_links,"Pages":pages}
            driver.quit()
            return data
            
    except:
        print("didn't find the stuff")
        driver.quit()


#Program
def main():
    src_keywords = input("What do you want to search (case-sensitive) ?\n").split()
    clear()
    save_format = int(input("what do you want to save it as ?\n1.csv\n2.MySQL\n3.Json\n4.Text\n"))
    clear()
    running = True if int(input("1.Run Program\n2.Exit Program\n")) == 1 else False
    clear()
    url = url_maker(src_keywords)
    i= 1
    page_to_scrape = 0
    while running :
        if i > 1  :
            total_page = scraped_data["Pages"][-1]
            #Scrape Pages
            page_to_scrape =int(input(f"from {total_page} How many pages do you want to scrape ?\n"))
            for page in range(2,page_to_scrape+1):
                print(f"Current Page :{page}")
                next_url = next_page_url(url,page)
                #print(f"current Proxy :{proxy_changer(i)} and User-Agent:{user_agent_changer(i)}")
                try:
                    next_scraped_data = scrapetokped(next_url,i)
                    scraped_data["Product Name"].append(next_scraped_data["Product Name"])
                    scraped_data["Price"].append(next_scraped_data["Price"])
                    scraped_data["Link"].append(next_scraped_data["Link"])
                    i += 1
                    print(f"Current Iteration {i}")
                except:
                    i += 1
                    print(f"Current Iteration Failed {i}")
                    continue
            print("<--Finished Scraping-->")
            option = int(input("1.Save & Exit\n2.Scrape Some More\n"))
            if option == 1:
                print(scraped_data)
                saver(save_format,scraped_data,src_keywords)
                print("Exiting ....")
                running = False
            else:
                break
        elif i == 1 :
            #proxy_changer(i)
            #user_agent_changer(i)
            scraped_data = scrapetokped(url,i)
            i+=1
        else:
            print("error")
            print("Exiting ....")
            running = False
            
    print("Thank you for using the program")

if __name__ == "__main__":
    main()