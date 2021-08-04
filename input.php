<?= $this->extends('index')?>
<?php
$titikPantau = [
    'name' => 'titikPantau'
    'id' => 'titikPantau',
	'value' => null,
	'class' => 'form-control',
];

$tahun =[
	'name' => 'tahun',
	'id' => 'tahun',
	'value' => null,
	'class' => 'form-control',
];

$waktuSampling = [
	'name' => 'waktuSampling',
	'id' => 'waktuSampling',
	'value' => null,
	'class' => 'form-control',
	'type' => 'date',
];

$debitAir =[
	'name' => 'debitAir',
	'id' => 'debitAir',
	'value' => null,
	'class' => 'form-control',
	'type' => 'number',
	'min' => 0,
];

$konesentrasiBod = [
	'name' => 'konsentrasiBod',
	'id' => 'konsentrasiBod',
	'value' => null,
	'class' => 'form-control',
	'type' => 'number',
	'min' => 0,
];
?>
	<div class="form-group">
		<?= form_label("titikPantau", "titikPantau") ?>
		<?= form_input($titikPantau) ?>
	</div>

	<div class="form-group">
		<?= form_label("tahun", "tahun") ?>
		<?= form_input($tahun) ?>
	</div>

	<div class="form-group">
		<?= form_label("waktuSampling", "waktuSampling") ?>
		<?= form_input($waktuSampling) ?>
	</div>

	<div class="form-group">
		<?= form_label("debitAir", "debitAir") ?>
		<?= form_upload($debitAir) ?>
	</div>

    <div class="form-group">
		<?= form_label("konsentrasiBod", "konsentrasiBod") ?>
		<?= form_upload($konsentrasiBod) ?>
	</div>

	<div class="text-right">
		<?= form_submit($submit) ?>
	</div>

?>