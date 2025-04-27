from flask import Flask, render_template, request
from urllib.parse import unquote
import os
import pandas as pd
import sqlite3
import json
import matplotlib.colors as mcolors
import numpy as np

def format_number(number):

    thousands = round(number / 1000, 1)
    formatted = "{:,.1f}".format(thousands).replace(",", " ").replace(".", ",")
    
    return f"{formatted} тыс."


application = Flask(__name__)

@application.route('/')
def resume():
    return render_template('cv.html')

@application.route('/info')
def info():
    return render_template('index.html')

@application.route('/district')
def district():

    district_name = request.args.get('district', '')

    connection = sqlite3.connect('municipal.db')

    cursor = connection.cursor()
    cursor.execute('SELECT max(year) FROM Pop')
    current_year = cursor.fetchone()[0]

    text_query = '''
            WITH districts AS (
            SELECT 
                ROW_NUMBER() OVER (PARTITION BY district ORDER BY rowid) AS mun_num_dist,
                name,
                district,
                namestat,
                area
            FROM 
                Municip
            WHERE
                district = ?),
            population AS (
            SELECT 
                namestat,
                population
            FROM 
                Pop
            WHERE 
                year = ?), 
            distInfo AS (
            SELECT 
                mun_num_dist,
                name, 
                district,
                population,
                area
            FROM 
                districts d LEFT JOIN population p ON d.namestat = p.namestat)
            SELECT
                district,
                COUNT(name) AS muncount,
                SUM(population) as population,
                SUM(area) as area,
                SUM(population)/SUM(area) as density
            FROM 
                distInfo
            GROUP BY
                district'''

    cursor = connection.cursor()
    result = cursor.execute(text_query, (district_name, current_year)).fetchone()
    mun_count = result[1]          # Второй столбец (индекс 1)
    district_population = format_number(result[2])  # Третий столбец (индекс 2)
    district_area = round(result[3], 1)
    district_density = format_number(result[4])

    mun_query = '''WITH districts AS (
                SELECT 
                    ROW_NUMBER() OVER (PARTITION BY district ORDER BY rowid) AS mun_num_dist,
                    name, 
                    namestat,
                    area
                FROM 
                    Municip
                WHERE
                    district = ?),
            population AS (
                SELECT 
                    namestat,
                    population
                FROM 
                    Pop
                WHERE 
                    year = 2024
            )
            SELECT 
                mun_num_dist,
                name, 
                population,
                area, 
                population/area as density
            FROM 
                districts d LEFT JOIN population p ON d.namestat = p.namestat'''

    df = pd.read_sql(mun_query, con=connection, params=(district_name,))

    df['area'] = df['area'].apply(lambda x: round(x, 2))
    df['population'] = df['population'].apply(lambda x: "{:,}".format(x).replace(",", " "))
    df['density'] = df['density'].apply(lambda x: "{:,}".format(round(x)).replace(",", " "))
    df = df.rename(columns={'mun_num_dist': '#', 
                            'name': 'Название', 
                            'population': 'Население',
                            'area': 'Площадь, км²', 
                            'density': 'Плотность'})
    df = df.to_html(index=None)


    chart_query = '''WITH districts AS (
                    SELECT 
                        ROW_NUMBER() OVER (PARTITION BY district ORDER BY rowid) AS mun_num_dist,
                        name,
                        district,
                        namestat,
                        area
                    FROM 
                        Municip
                    WHERE
                        district = ?),
                    population AS (
                    SELECT 
                        namestat,
                        population,
                        year
                    FROM 
                        Pop
                    )
                    SELECT
                    name,
                    year,
                    population
                    FROM 
                    population p JOIN districts d ON p.namestat=d.namestat'''
    
    chart_df = pd.read_sql(chart_query, con=connection, params=(district_name,))
    chart_df = chart_df.pivot(index='year', columns='name', values='population').rename_axis(columns=None).reset_index()

    years = list(chart_df['year'])
    muns = list(chart_df.columns)[1:]

    chart_data = {
    "labels": years,
    "datasets": []
    }

    saturated_palette = [
    "#FF6B8B",  # Насыщенный розовый
    "#FFD166",  # Яркий жёлтый
    "#4ECDC4",  # Насыщенный бирюзовый
    "#7E8EF1",  # Яркий голубой
    "#A8DF65",  # Сочный зелёный
    "#FF9A76",  # Насыщенный оранжевый
    "#6AC3FF",  # Яркий аквамарин
    "#FF8FAB",  # Розовый (насыщенный)
    "#D67D7D",  # Тёплый красный
    "#5E9EFF",  # Чистый синий
    "#B399D4",  # Насыщенный лавандовый
    "#D68FD6"   # Яркий сиреневый
    ]

    for i, column in enumerate(muns):
        color = saturated_palette[i % len(saturated_palette)]  # Зацикливание, если цветов мало
        chart_data["datasets"].append({
            "label": column,
            "data": chart_df[column].tolist(),
            "borderColor": color,
            "backgroundColor": color + "80",  # 50% прозрачности (Hex: 80 = 128/255)
            "borderWidth": 2,
            "tension": 0.4
        })

    chart_data

    connection.close()

    return render_template('district.html', 
                           district_table = df, 
                           year = current_year, 
                           district_name = district_name,
                           muncount = mun_count,
                           district_population = district_population,
                           district_area = district_area,
                           district_density = district_density, 
                           chart_table = chart_df, 
                           chart_data=chart_data)

if __name__ == '__main__':
    application.run(debug=True)
