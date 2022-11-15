let xError = document.getElementById("xError");
let yError = document.getElementById("yError");
let rError = document.getElementById("rError");

let x, y, r;

function xCheck()
{
	x = $('select[name=X] option:selected').text();
	return true;
}

function yCheck()
{
	y = $('input[name=Y]').val().replace(",", ".");

	if (y == undefined || y === "")
	{
        yError.textContent = "Введите значение Y";
        return false;
    }
    else if (!$.isNumeric(y))
	{
        yError.textContent = "Y - не число";
        return false;
    }
    else if (y < -3 || y > 3)
	{
        yError.textContent = "Y вне диапазона (-3;3)";
        return false;
    }
    else
	{
		yError.textContent = "";
		return true;
	}
}

function rCheck()
{
	r = $('input[name=R]:checked').val();

	if (r === undefined)
	{
		rError.textContent = "R не выбран";
		return false;
	}
	else
	{
		rError.textContent = "";
		return true;
	}
}

$("#check").on('submit', function(e)
{
    e.preventDefault();
    if(rCheck() && xCheck() && yCheck())
    {
        $.ajax({
            type:"POST",
            url:"main.php",
            data: {"x": x, "y": y, "r": r,},
            success: function(response)
            {
                localStorage.setItem(localStorage.length, JSON.stringify(response));
                addRow(localStorage.length, response);
            },
            dataType:"json"
        });
    }
});


function addRow(id, data)
{
    $('#resultTable').append
    (`
		<tr>
             <td>${data.x}</td>
             <td>${data.y}</td>
             <td>${data.r}</td>
             <td>${data.inArea ? "Да" : "Нет"}</td>
             <td>${data.finishTime}</td>
             <td>${(data.scriptTime * 1000).toPrecision(3) + " мс"}</td>
		</tr>
	`);
}

function drawTable()
{
    for (let i = 1; i <= localStorage.length; i++){
        addRow(i, JSON.parse(localStorage.getItem(i-1)));
    }
}

$("#reset").on('click', function(e)
{
    localStorage.clear();
    $('#resultTable tr:not(:first-child)').html("");
});


drawTable();

