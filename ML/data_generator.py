tot_year = 5


year = [2014, 2015, 2016, 2017, 2018]
year_solar = [0, 200, 100, 300, 50]
month_solar = [100, 100, 250, 300, 350, 500, 800, 900, 500, 300, 200, 0]
hours_solar = [0, 0, 0, 0, 1000, 2000, 3000, 6000, 10000, 13000, 15000, 20000,
               18000, 15000, 12000, 10000, 8000, 6000, 4000, 2000, 0, 0, 0, 0]

hours_consumption = [300, 0, 0, 0, 0, 0,
                     100, 100, 0, 0, 0, 0,
                     0, 0, 0, 0, 0, 300,
                     500, 500, 500, 500, 500, 500]


def generate():
    fin = open("input.csv", 'w')
    fin.write("Year, Month, day, hour, solar\n")
    fout = open("output.csv", 'w')
    fout.write("consumption\n")
    for y in range(tot_year):
        yy = year[y]
        for mm in range(1, 13):
            for dd in range(1, 29):
                for hh in range(24):
                    solar = hours_solar[hh] + (month_solar[mm-1]**2 / 100) + year_solar[y]
                    consumption = hours_consumption[hh] + ((1000-month_solar[mm-1])/10) + ((300-year_solar[y])/10)
                    fin.write(str(yy)+','+str(mm)+','+str(dd)+','+str(hh)+','+str(solar)+'\n')
                    fout.write(str(consumption)+'\n')

    fin.close()
    fout.close()

generate()

