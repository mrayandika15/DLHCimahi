<h1> Pengolahan Data</h1>
<p> Beban Pencemar Eksisting</p>

<form action="" method="post">
<table>
    <tr>
        <td width="120"> Waktu Sampling </td>
        <td> <input type="date" name="waktu_sampling" value="<?=date('Y-m-d')?>"> </td>
    </tr>
    <tr>
        <td> Debit Air </td>
        <td> <input type="number" name="debit_air"> </td>
    </tr>
    <tr>
        <td> Konsentrasi BOD </td>
        <td> <input type="number" name="konsentrasi_bod"> </td>
    </tr>
    <tr>
        <td></td>
        <td><input type="submit" name="proses" value="Simpan"> </td>
    </tr>
</table>

</form>

<?=
include "koneksi.php";

if (isset($_POST['proses'])){
    mysqli_query($koneksi, "insert into input_bpe set
    waktu_sampling = '$_POST[waktu_sampling]',
    debit_air = '$_POST[debit_air]',
    konsentrasi_bod = '$_POST[konsentrasi_bod]'");

    echo "Data disimpan";
}
?>